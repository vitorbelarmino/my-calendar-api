import jwt, { TokenExpiredError } from "jsonwebtoken";
import createError from "http-errors";
import { Request } from "express";

interface IUser {
  id: string;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const ACCESS_TOKEN_EXPIRATION = "15m";
const REFRESH_TOKEN_EXPIRATION = "7d";

export class Token {
  static createAccessToken(user: IUser): string {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
      algorithm: "HS256",
    });
  }

  static createRefreshToken(user: IUser): string {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
      algorithm: "HS256",
    });
  }

  static verifyToken(token: string, isRefresh = false): IUser {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      if (typeof decoded === "string") {
        throw createError(401, `Invalid ${isRefresh ? "refresh " : ""}token`);
      }

      return { id: decoded.id, email: decoded.email };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw createError(401, `${isRefresh ? "Refresh token" : "Token"} expired`);
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw createError(401, `Invalid ${isRefresh ? "refresh " : ""}token`);
      }

      throw createError(500, "Internal Server Error");
    }
  }

  static validateToken(req: Request): string {
    const { authorization } = req.headers;

    if (!authorization) {
      throw createError(401, "Token not found");
    }

    const [, token] = authorization.split(" ");

    if (!token) {
      throw createError(401, "Token not found");
    }

    const user = Token.verifyToken(token);
    return user.id;
  }
}
