"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { PrismaClient } from "../../generated/prisma";
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function isAuthenticated(req, res, next) {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: "Token não fornecido" });
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("ERRO GRAVE: JWT_SECRET não foi definida no ambiente.");
            return res
                .status(500)
                .json({ error: "Erro de configuração interna do servidor." });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });
        if (!user) {
            return res.status(401).json({ error: "Usuário do token não encontrado" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({ error: "Token expirado. Por favor, faça login novamente." });
        }
        if (error.name === "JsonWebTokenError") {
            return res
                .status(401)
                .json({ error: "Token inválido (assinatura ou formato incorreto)." });
        }
        console.error("Erro inesperado no middleware:", error);
        return res
            .status(500)
            .json({ error: "Erro interno no servidor de autenticação." });
    }
}
