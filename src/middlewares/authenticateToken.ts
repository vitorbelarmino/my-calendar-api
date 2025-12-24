import { Request, Response, NextFunction } from "express";
import { Token } from "../Utils/Token";

export class AuthMiddleware {
  static async authenticateToken(req: Request, res: Response, next: NextFunction) {
    const userId = Token.validateToken(req);
    (req as any).userId = userId;
    next();
  }
}
