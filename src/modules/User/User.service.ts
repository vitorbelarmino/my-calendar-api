import prisma from "../../config/database";
import { CreateUserDTO } from "./dto/CreateUserDTO";
import { UpdateUserDTO } from "./dto/UpdateUserDTO";
import { BCrypt } from "../../Utils/BCrypt";
import createError from "http-errors";

class UserService {
  constructor(private db = prisma) {}

  async create(data: CreateUserDTO) {
    const userExists = await this.db.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw createError(409, "Email already registered");
    }

    const hashedPassword = await BCrypt.hashPassword(data.password);

    const user = await this.db.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await this.db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw createError(404, "User not found");
    }

    return user;
  }

  async update(id: string, data: UpdateUserDTO) {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw createError(404, "User not found");
    }

    if (data.email && data.email !== user.email) {
      const emailExists = await this.db.user.findUnique({
        where: { email: data.email },
      });

      if (emailExists) {
        throw createError(409, "Email already registered");
      }
    }

    const updateData = { ...data };
    if (data.password) {
      updateData.password = await BCrypt.hashPassword(data.password);
    }

    return this.db.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: string) {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw createError(404, "User not found");
    }

    await this.db.user.delete({
      where: { id },
    });

    return { message: "User deleted successfully" };
  }
}

export default new UserService();
