import { isAuthenticated } from "../../core/middlewares/isAuthenticated.middleware";
import DepartmentController from "./department.controller";
import { Router } from "express";

const departmentRouter = Router();

departmentRouter.post("/", isAuthenticated, DepartmentController.create);
departmentRouter.put("/:id", isAuthenticated, DepartmentController.update);
departmentRouter.get("/", isAuthenticated, DepartmentController.getAll);

export default departmentRouter;
