export class AppError extends Error {
  public readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    // 404 Not Found
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    // 400 Bad Request
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    // 401 Unauthorized
    super(message, 401);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    // 409 Conflict (ex: email já existe)
    super(message, 409);
  }
}

export class ToManyRequestsError extends AppError {
  constructor(message: string) {
    super(message, 429);
  }
}
