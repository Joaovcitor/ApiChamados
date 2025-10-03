import { Router } from "express";
import AuthController from "./auth.controller";
import { isAuthenticated } from "../../core/middlewares/isAuthenticated.middleware";
const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.get("/me", isAuthenticated, AuthController.getUser);
export default authRouter;
