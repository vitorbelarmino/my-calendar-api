import prisma from "../../config/database";
import { UpdateUserDTO } from "./dto/UpdateUserDTO";
import { BCrypt } from "../../Utils/BCrypt";
import createError from "http-errors";

class UserService {
  constructor(private db = prisma) {}

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

    return this.db.user.update({
      where: { id },
      data,
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
