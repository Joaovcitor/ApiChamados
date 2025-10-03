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
}
export default new DepartmentService();
