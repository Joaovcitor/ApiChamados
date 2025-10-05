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
  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const department = await DepartmentService.getById(id);
    res.status(200).json(department);
  }
  async addUserInDepartment(req: Request, res: Response) {
    const id = Number(req.params.id);
    const userId = Number(req.body.userId);
    const department = await DepartmentService.addUserInDepartment(id, userId);
    res.status(200).json(department);
  }
  // async getAllUsersInDepartment(req: Request, res: Response) {
  //   const id = Number(req.params.id);
  //   const department = await DepartmentService.getAllUsersInDepartment(id);
  //   res.status(200).json(department);
  // }
}

export default new DepartmentController();
