import prisma from "../../config/database";
import { LoginDTO } from "./dto/LoginDTO";
import { RegisterDTO } from "./dto/RegisterDTO";
import { BCrypt } from "../../Utils/BCrypt";
import { Token } from "../../Utils/Token";
import createError from "http-errors";

const USER_SELECT = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
} as const;

class AuthService {
  constructor(private db = prisma) {}

  async login(data: LoginDTO) {
    const user = await this.db.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw createError(401, "Invalid credentials");
    }

    await BCrypt.comparePasswords(data.password, user.password);

    const accessToken = Token.createAccessToken(user);
    const refreshToken = Token.createRefreshToken(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }

  async register(data: RegisterDTO) {
    const userExists = await this.db.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw createError(409, "User already exists");
    }

    const hashedPassword = await BCrypt.hashPassword(data.password);

    const user = await this.db.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: USER_SELECT,
    });

    const accessToken = Token.createAccessToken(user);
    const refreshToken = Token.createRefreshToken(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(oldRefreshToken: string) {
    const payload = Token.verifyToken(oldRefreshToken, true);

    const user = await this.db.user.findUnique({
      where: { id: payload.id },
      select: USER_SELECT,
    });

    if (!user) {
      throw createError(404, "User not found");
    }

    const accessToken = Token.createAccessToken(user);
    const refreshToken = Token.createRefreshToken(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}

export default new AuthService();
