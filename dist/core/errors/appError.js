"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToManyRequestsError = exports.ConflictError = exports.UnauthorizedError = exports.BadRequestError = exports.NotFoundError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
class NotFoundError extends AppError {
    constructor(message) {
        // 404 Not Found
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends AppError {
    constructor(message) {
        // 400 Bad Request
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends AppError {
    constructor(message) {
        // 401 Unauthorized
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ConflictError extends AppError {
    constructor(message) {
        // 409 Conflict (ex: email já existe)
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
class ToManyRequestsError extends AppError {
    constructor(message) {
        super(message, 429);
    }
}
exports.ToManyRequestsError = ToManyRequestsError;
