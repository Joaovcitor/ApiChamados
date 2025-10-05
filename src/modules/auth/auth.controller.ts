import { Request, Response } from "express";
import AuthService from "./auth.service";
import { sendSuccess } from "../../core/utils/responseHandler";

export default class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const authService = new AuthService();
    const { user, token } = await authService.login(email, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    sendSuccess(res, { user, token });
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie("token");
    sendSuccess(res, { message: "Logout realizado com sucesso" });
  }

  static async getUser(req: Request, res: Response) {
    const token = req.cookies.token;
    const authService = new AuthService();
    const user = await authService.getUser(token);
    sendSuccess(res, { user });
  }
}
