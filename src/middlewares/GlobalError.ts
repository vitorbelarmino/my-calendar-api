import { NextFunction, Request, Response } from "express";

class GlobalError {
  static handleError(err: any, _req: Request, res: Response, _next: NextFunction): void {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({
      type: err.name,
      message: message,
    });
  }
}

export default GlobalError;
