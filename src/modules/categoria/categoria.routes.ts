import { Router } from "express";
import CategoriaController from "./categoria.controller";
import { isAuthenticated } from "../../core/middlewares/isAuthenticated.middleware";
const categoriaRouter = Router();

categoriaRouter.post("/", isAuthenticated, CategoriaController.create);
categoriaRouter.get("/", isAuthenticated, CategoriaController.getAll);
categoriaRouter.get("/:id", isAuthenticated, CategoriaController.getById);
categoriaRouter.put("/:id", isAuthenticated, CategoriaController.update);
export default categoriaRouter;
