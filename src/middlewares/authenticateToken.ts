import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { Token } from "../Utils/Token";
import prisma from "../config/database";

export class AuthMiddleware {
  static async authenticateToken(req: Request, res: Response, next: NextFunction) {
    const userId = Token.validateToken(req);

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw createError(401);
    }

    (req as any).userId = userId;
    next();
  }
}
