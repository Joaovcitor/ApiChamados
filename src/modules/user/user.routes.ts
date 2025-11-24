import { isAuthenticated } from "../../core/middlewares/isAuthenticated.middleware";
import { verifyRole } from "../../core/middlewares/verifyRole.middleware";
import userController from "./user.controller";
import { Router } from "express";
const userRouter = Router();
userRouter.post(
  "/",
  isAuthenticated,
  verifyRole(["ADMIN"]),
  userController.create
);
userRouter.get(
  "/",
  isAuthenticated,
  verifyRole(["ADMIN"]),
  userController.getAllUsers
);
userRouter.get("/:id", isAuthenticated, userController.getById);
userRouter.put(
  "/:id",
  isAuthenticated,
  verifyRole(["ADMIN"]),
  userController.changeRoleUser
);
userRouter.patch(
  "/:id",
  isAuthenticated,
  verifyRole(["ADMIN"]),
  userController.addRoleUser
);
userRouter.delete(
  "/:id",
  isAuthenticated,
  verifyRole(["ADMIN"]),
  userController.removeRoleUser
);

export default userRouter;
