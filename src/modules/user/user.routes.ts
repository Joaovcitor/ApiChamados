import { isAuthenticated } from "../../core/middlewares/isAuthenticated.middleware";
import userController from "./user.controller";
import { Router } from "express";
const userRouter = Router();
userRouter.post("/comum", isAuthenticated, userController.createUserComum);
userRouter.post("/admin", isAuthenticated, userController.createUserAdmin);

export default userRouter;
