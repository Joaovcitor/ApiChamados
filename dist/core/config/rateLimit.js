"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitConfig = rateLimitConfig;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
function rateLimitConfig(max, windowMs) {
    return (0, express_rate_limit_1.default)({
        max,
        windowMs,
        standardHeaders: true,
        legacyHeaders: false,
        message: "Muitas requisições feitas, tente novamente mais tarde.",
    });
}
