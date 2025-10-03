import bcrypt from "bcryptjs";
import { prisma } from "../../core/prisma/prisma";
import type { UserCreateDTO } from "./user.dto";
import { RolesUser, type User } from "@prisma/client";

class UserService {
  async createUserComum(data: UserCreateDTO) {
    const user = this.createUser(data, "USER");
    return user;
  }
  async createUserAgent(data: UserCreateDTO) {
    const user = this.createUser(data, "AGENT");
    return user;
  }
  async createUserAdmin(data: UserCreateDTO) {
    const user = this.createUser(data, "ADMIN");
    return user;
  }

  private async createUser(data: UserCreateDTO, role: string) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashPassword,
        role: role as RolesUser,
      },
    });
    return user;
  }
}

export default new UserService();
