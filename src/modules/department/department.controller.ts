import DepartmentService from "./department.service";
import { DepartmentDto, DepartmentUpdateDto } from "./department.dto";
import { Request, Response } from "express";

class DepartmentController {
  async create(req: Request, res: Response) {
    const departmentDto = req.body as DepartmentDto;
    const department = await DepartmentService.create(departmentDto);
    res.status(201).json(department);
  }
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const departmentUpdateDto = req.body as DepartmentUpdateDto;
    const department = await DepartmentService.update(id, departmentUpdateDto);
    res.status(200).json(department);
  }
  async getAll(req: Request, res: Response) {
    const departments = await DepartmentService.getAll();
    res.status(200).json(departments);
  }
}

export default new DepartmentController();
