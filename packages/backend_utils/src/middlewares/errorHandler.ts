import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

export function handleError(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.log("Error in handler: ", err);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    statusCode: 500,
  });
}
