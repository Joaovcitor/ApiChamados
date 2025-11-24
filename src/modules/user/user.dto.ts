import type { EnumRolesUser } from "@prisma/client";

export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
  role: EnumRolesUser;
}
