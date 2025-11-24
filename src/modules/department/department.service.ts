import { DepartmentDto, DepartmentUpdateDto } from "./department.dto";
import { prisma } from "../../core/prisma/prisma";
import { BadRequestError, ConflictError } from "../../core/errors/appError";

class DepartmentService {
  async create(departmentDto: DepartmentDto) {
    return prisma.department.create({
      data: departmentDto,
    });
  }
  async update(id: number, departmentUpdateDto: DepartmentUpdateDto) {
    return prisma.department.update({
      where: {
        id,
      },
      data: departmentUpdateDto,
    });
  }
  async getAll() {
    return prisma.department.findMany({
      include: {
        chamados: true,
        listDepartmentUser: {
          include: { user: { select: { id: true, name: true } } },
        },
      },
    });
  }
  async getById(id: number) {
    return prisma.department.findUnique({
      where: {
        id,
      },
      include: {
        chamados: true,
      },
    });
  }
  async addUserInDepartment(id: number, userId: number) {
    const department = await this.getById(id);
    if (!department) {
      throw new Error("Department not found");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: true,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const hasAgentRole = user.role.some((r) => r.role === "AGENT");

    if (!hasAgentRole) {
      throw new BadRequestError("Usuário não é um agente");
    }
    const listDepartmentUser = await prisma.listDepartmentUser.findMany({
      where: {
        departmentId: id,
      },
    });
    if (listDepartmentUser.map((item) => item.userId).includes(user.id)) {
      throw new ConflictError("Usuário já está associado a este departamento");
    }
    return prisma.listDepartmentUser.create({
      data: {
        departmentId: id,
        userId,
      },
    });
  }
  async getListDepartmentUser(id: number) {
    return prisma.listDepartmentUser.findMany({
      where: {
        userId: id,
      },
    });
  }
}
export default new DepartmentService();
