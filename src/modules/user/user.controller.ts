import { Request, Response } from "express";
import UserService from "./user.service";
import type { UserCreateDTO } from "./user.dto";
import { sendSuccess } from "../../core/utils/responseHandler";

class UserController {
  async createUserComum(req: Request, res: Response) {
    const userCreate: UserCreateDTO = req.body;
    const user = await UserService.createUserComum(userCreate);
    return sendSuccess(res, user);
  }
  async createUserAdmin(req: Request, res: Response) {
    const userCreate: UserCreateDTO = req.body;
    const user = await UserService.createUserAdmin(userCreate);
    return sendSuccess(res, user);
  }
}

export default new UserController();
