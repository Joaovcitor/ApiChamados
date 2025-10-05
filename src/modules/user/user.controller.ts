import { Request, Response } from "express";
import UserService from "./user.service";
import type { UserCreateDTO } from "./user.dto";
import { sendSuccess } from "../../core/utils/responseHandler";
import type { RolesUser } from "@prisma/client";

class UserController {
  async create(req: Request, res: Response) {
    const userCreate: UserCreateDTO = req.body;
    const user = await UserService.createUser(userCreate);
    return sendSuccess(res, user);
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await UserService.getAllUsers();
    return sendSuccess(res, users);
  }
  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await UserService.getById(id);
    return sendSuccess(res, user);
  }
  async changeRoleUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const role = req.body.role as RolesUser;
    const updatedUser = await UserService.changeRoleUser(id, role);
    return sendSuccess(res, updatedUser);
  }
}

export default new UserController();
