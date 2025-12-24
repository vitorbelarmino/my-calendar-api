import bcrypt from "bcrypt";
import createError from "http-errors";

export class BCrypt {
  static async hashPassword(password: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    } catch (error) {
      throw createError(500, "Error generating password hash");
    }
  }

  static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      if (!match) {
        throw new Error();
      }
      return match;
    } catch (error) {
      throw createError(401, "Invalid credentials");
    }
  }
}
