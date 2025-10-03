import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  console.error("Erro inesperado: ", error);

  return res.status(500).json({
    message: "Internal server error",
  });
}
