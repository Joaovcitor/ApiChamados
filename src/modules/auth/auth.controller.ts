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

  static async getUser(req: Request, res: Response) {
    const user = req.cookies.token;
    sendSuccess(res, { user });
  }
}
