"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../core/prisma/prisma");
const appError_1 = require("../../core/errors/appError");
class AuthService {
    async login(email, password) {
        const user = await this.findUserByEmail(email);
        await this.comparePasswords(password, user.password);
        return this.handleSuccessfulLogin(user);
    }
    async findUserByEmail(email) {
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new appError_1.NotFoundError("Usuário não encontrado");
        }
        return user;
    }
    async comparePasswords(password, userPassword) {
        const isPasswordValid = await bcryptjs_1.default.compare(password, userPassword);
        if (!isPasswordValid) {
            throw new appError_1.UnauthorizedError("Senha inválida");
        }
    }
    async handleSuccessfulLogin(user) {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new appError_1.BadRequestError("Secret JWT not found");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, secret, {
            expiresIn: "24h",
        });
        const { password: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token,
        };
    }
}
exports.default = AuthService;
