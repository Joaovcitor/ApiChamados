import type { RolesUser } from "@prisma/client";

export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
  role: RolesUser;
}
