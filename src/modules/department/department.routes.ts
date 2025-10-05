import { isAuthenticated } from "../../core/middlewares/isAuthenticated.middleware";
import { verifyRole } from "../../core/middlewares/verifyRole.middleware";
import DepartmentController from "./department.controller";
import { Router } from "express";

const departmentRouter = Router();

departmentRouter.post(
  "/",
  isAuthenticated,
  verifyRole(["admin"]),
  DepartmentController.create
);
departmentRouter.put(
  "/:id",
  isAuthenticated,
  verifyRole(["admin"]),
  DepartmentController.update
);
departmentRouter.get("/", isAuthenticated, DepartmentController.getAll);
departmentRouter.get("/:id", isAuthenticated, DepartmentController.getById);
departmentRouter.post(
  "/:id/users",
  isAuthenticated,
  DepartmentController.addUserInDepartment
);

export default departmentRouter;
