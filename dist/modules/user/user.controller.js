"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const responseHandler_1 = require("../../core/utils/responseHandler");
class UserController {
    async createUserComum(req, res) {
        const userCreate = req.body;
        const user = await user_service_1.default.createUserComum(userCreate);
        return (0, responseHandler_1.sendSuccess)(res, user);
    }
    async createUserAdmin(req, res) {
        const userCreate = req.body;
        const user = await user_service_1.default.createUserAdmin(userCreate);
        return (0, responseHandler_1.sendSuccess)(res, user);
    }
}
exports.default = new UserController();
