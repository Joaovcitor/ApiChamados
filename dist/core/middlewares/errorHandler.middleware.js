"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const appError_1 = require("../errors/appError");
function errorHandler(error, req, res, next) {
    if (error instanceof appError_1.AppError) {
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
