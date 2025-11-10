import { Router } from "express";
import AuthController from "./auth.controller";
import { isAuthenticated } from "../../core/middlewares/isAuthenticated.middleware";
import { rateLimitConfig } from "../../core/config/rateLimit";
const authRouter = Router();

authRouter.post("/login", rateLimitConfig(5, 60 * 1000), AuthController.login);
authRouter.post("/logout", isAuthenticated, AuthController.logout);
authRouter.get("/me", isAuthenticated, AuthController.getUser);
authRouter.put(
  "/email",
  rateLimitConfig(2, 60 * 1000),
  isAuthenticated,
  AuthController.updateEmail
);
authRouter.put(
  "/password",
  rateLimitConfig(2, 60 * 1000),
  isAuthenticated,
  AuthController.updatePassword
);
export default authRouter;
