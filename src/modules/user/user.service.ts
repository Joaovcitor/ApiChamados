import bcrypt from "bcryptjs";
import { prisma } from "../../core/prisma/prisma";
import type { UserCreateDTO } from "./user.dto";
import { EnumRolesUser, type User } from "@prisma/client";
import { NotFoundError } from "../../core/errors/appError";

class UserService {
  async getAllUsers() {
    const users = await prisma.user.findMany({
      include: { role: true },
    });
    return users;
  }
  async getById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: { role: true },
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
        name: data.name,
        email: data.email,
        password: hashPassword,
        role: {
          create: {
            role: data.role,
          },
        },
      },
      include: { role: true },
    });
    return user;
  }
  async addRole(id:number, role: EnumRolesUser) {
    const user = await prisma.user.findUnique({where:{id}, include: {role: true}});
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const hasRole = user.role.some((r) => r.role === role);
    if (hasRole) {
      throw new Error("User already has this role");
    }
    const updateRoleUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: {
          create: {
            role: role,
          },
        },
      },
      include: { role: true },
    });
    return updateRoleUser;
  }
  async removeRoleUser(id: number, role: EnumRolesUser) {
    const user = await prisma.user.findUnique({where:{id}, include: {role: true}});
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const hasRole = user.role.some((r) => r.role === role);
    if (!hasRole) {
      throw new Error("User does not have this role");
    }
    const updateRoleUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: {
          deleteMany: {
            role: role,
          },
        },
      },
      include: { role: true },
    });
    return updateRoleUser;
  }
  async changeRoleUser(id: number, role: EnumRolesUser) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: { role: true },
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    // Check if user already has ONLY this role
    if (user.role.length === 1 && user.role[0].role === role) {
      throw new Error("User already has this role");
    }
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: {
          deleteMany: {},
          create: {
            role: role,
          },
        },
      },
      include: { role: true },
    });
    return updatedUser;
  }
}

export default new UserService();
