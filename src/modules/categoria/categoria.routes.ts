import { Router } from "express";
import CategoriaController from "./categoria.controller";
import { isAuthenticated } from "../../core/middlewares/isAuthenticated.middleware";
import { verifyRole } from "../../core/middlewares/verifyRole.middleware";
const categoriaRouter = Router();

categoriaRouter.post(
  "/",
  isAuthenticated,
  verifyRole(["ADMIN"]),
  CategoriaController.create
);
categoriaRouter.get("/", isAuthenticated, CategoriaController.getAll);
categoriaRouter.get("/:id", isAuthenticated, CategoriaController.getById);
categoriaRouter.put(
  "/:id",
  isAuthenticated,
  verifyRole(["ADMIN"]),
  CategoriaController.update
);
export default categoriaRouter;
