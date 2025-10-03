import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import { PrismaClient } from "../../generated/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface JwtPayload {
  id: number;
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

    const decoded = jwt.verify(token, secret) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ error: "Usuário do token não encontrado" });
    }
    req.user = user;
    next();
  } catch (error: any) {
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
