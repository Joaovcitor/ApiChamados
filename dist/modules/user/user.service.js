"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../core/prisma/prisma");
class UserService {
    async createUserComum(data) {
        const user = this.createUser(data, "USER");
        return user;
    }
    async createUserAgent(data) {
        const user = this.createUser(data, "AGENT");
        return user;
    }
    async createUserAdmin(data) {
        const user = this.createUser(data, "ADMIN");
        return user;
    }
    async createUser(data, role) {
        const hashPassword = await bcryptjs_1.default.hash(data.password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                ...data,
                password: hashPassword,
                role: role,
            },
        });
        return user;
    }
}
exports.default = new UserService();
