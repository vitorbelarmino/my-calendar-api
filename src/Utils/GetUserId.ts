import { Request } from "express";
import createError from "http-errors";

export const getUserId = (req: Request): string => {
  const userId = (req as any).userId as string | undefined;

  if (!userId) {
    throw createError(401, "Authentication required - userId not found in request");
  }

  return userId;
};
