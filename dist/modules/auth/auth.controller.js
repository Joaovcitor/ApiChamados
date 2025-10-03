"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth.service"));
const responseHandler_1 = require("../../core/utils/responseHandler");
class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;
        const authService = new auth_service_1.default();
        const { user, token } = await authService.login(email, password);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        (0, responseHandler_1.sendSuccess)(res, { user, token });
    }
    static async getUser(req, res) {
        const user = req.cookies.token;
        (0, responseHandler_1.sendSuccess)(res, { user });
    }
}
exports.default = AuthController;
