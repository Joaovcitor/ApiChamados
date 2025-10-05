import bcrypt from "bcryptjs";
import { prisma } from "../../core/prisma/prisma";
import type { UserCreateDTO } from "./user.dto";
import { RolesUser, type User } from "@prisma/client";
import { NotFoundError } from "../../core/errors/appError";

class UserService {
  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
  }
  async getById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
  async createUser(data: UserCreateDTO) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashPassword,
        role: data.role as RolesUser,
      },
    });
    return user;
  }
  async changeRoleUser(id: number, role: RolesUser) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    if (user.role === role) {
      throw new Error("User already has this role");
    }
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });
    return updatedUser;
  }
}

export default new UserService();
