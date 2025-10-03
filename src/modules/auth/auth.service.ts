import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../../core/prisma/prisma";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../core/errors/appError";
import type { User } from "@prisma/client";

export default class AuthService {
  async login(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    await this.comparePasswords(password, user.password);
    return this.handleSuccessfulLogin(user);
  }

  async getUser(token: string) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new BadRequestError("Secret JWT not found");
    }
    const payload = jwt.verify(token, secret) as { id: number };
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }
    return user;
  }

  private async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }
    return user;
  }
  private async comparePasswords(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Senha inválida");
    }
  }

  private async handleSuccessfulLogin(user: User) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new BadRequestError("Secret JWT not found");
    }
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: "24h",
    });
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
    };
  }
}
