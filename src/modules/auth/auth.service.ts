import { emailTemplates } from "./../../core/config/templatesEmail.config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../../core/prisma/prisma";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../core/errors/appError";
import type { User } from "@prisma/client";
import { emailConfig } from "../../core/config/email.config";

export default class AuthService {
  async login(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    await this.comparePasswords(password, user.password);
    return this.handleSuccessfulLogin(user);
  }
  async sendMailResetPassword(email: string) {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return;
    }
    const secret = process.env.JWT_SECRET_RESET_PASSWORD! + user.password;
    const token = jwt.sign({ id: user.id, type: "reset" }, secret, {
      expiresIn: "1h",
    });
    const send = await emailConfig.sendMail({
      from: process.env.EMAIL_USER!,
      to: user.email,
      subject: "Recuperação de Senha",
      html: emailTemplates.resetPassword(token),
    });
    return send;
  }

  async resetPasswordByToken(token: string, newPassword: string) {
    const decoded = jwt.decode(token) as { id: number; type: string };
    if (!decoded || !decoded.id || decoded.type !== "reset") {
      throw new BadRequestError("Token inválido");
    }
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }
    const secret = process.env.JWT_SECRET_RESET_PASSWORD! + user.password;
    try {
      jwt.verify(token, secret);
    } catch (err) {
      throw new BadRequestError("Token inválido ou expirado");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword },
    });
    return { message: "Senha atualizada com sucesso" };
  }

  async getUser(token: string) {
    const secret = process.env.JWT_SECRET!;
    const payload = jwt.verify(token, secret) as { id: number };
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: { listDepartmentUser: true, role: true },
    });
    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  }

  async updateEmail(userId: number, newEmail: string) {
    const user = await prisma.user.findUnique({ where: { email: newEmail } });
    if (user) {
      throw new BadRequestError("Email já está em uso");
    }
    await prisma.user.update({
      where: { id: userId },
      data: { email: newEmail },
    });
    return { message: "Email atualizado com sucesso" };
  }
  async updatePassword(userId: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return { message: "Senha atualizada com sucesso" };
  }

  private async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
    if (!user) {
      throw new UnauthorizedError("Credenciais inválidas");
    }
    return user;
  }
  private async comparePasswords(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Credenciais inválidas");
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
