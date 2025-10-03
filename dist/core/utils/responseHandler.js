"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendCreated = sendCreated;
exports.sendNoContent = sendNoContent;
exports.sendSuccessMessage = sendSuccessMessage;
function sendSuccess(res, data, statusCode = 200) {
    const response = {
        success: true,
        data,
    };
    return res.status(statusCode).json(response);
}
function sendCreated(res, data) {
    return sendSuccess(res, data, 201);
}
function sendNoContent(res) {
    return res.status(204).send();
}
function sendSuccessMessage(res, message, statusCode = 200) {
    return res.status(statusCode).json({
        success: true,
        message,
    });
}
