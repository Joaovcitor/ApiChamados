import { Response } from "express";
interface SuccessResponse<T> {
  success: true;
  data: T;
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode: number = 200
) {
  const response: SuccessResponse<T> = {
    success: true,
    data,
  };
  return res.status(statusCode).json(response);
}

export function sendCreated<T>(res: Response, data: T) {
  return sendSuccess(res, data, 201);
}

export function sendNoContent<T>(res: Response) {
  return res.status(204).send();
}

export function sendSuccessMessage(
  res: Response,
  message: string,
  statusCode: number = 200
) {
  return res.status(statusCode).json({
    success: true,
    message,
  });
}
