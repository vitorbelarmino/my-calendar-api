import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

class GlobalError {
  static handleError(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({
        message: err.message,
      });
      return;
    }

    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export default GlobalError;
