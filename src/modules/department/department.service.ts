import { DepartmentDto, DepartmentUpdateDto } from "./department.dto";
import { prisma } from "../../core/prisma/prisma";

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
    return prisma.department.findMany({ include: { chamados: true } });
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
    });
    if (user?.role !== "AGENT") {
      throw new Error("User not agent");
    }
    const listDepartmentUser = await prisma.listDepartmentUser.findMany({
      where: {
        departmentId: id,
      },
    });
    if (listDepartmentUser.map((item) => item.userId).includes(user.id)) {
      throw new Error("User already in department");
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
