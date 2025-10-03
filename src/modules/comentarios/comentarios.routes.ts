import { Router } from "express";
import { isAuthenticated } from "../../core/middlewares/isAuthenticated.middleware";
import commentController from "./comentarios.controller";
const commentRouter = Router();
commentRouter.post("/:chamadoId", isAuthenticated, commentController.create);
commentRouter.put("/:commentId", isAuthenticated, commentController.update);
commentRouter.get(
  "/:chamadoId",
  isAuthenticated,
  commentController.getCommentsByChamadoId
);

export default commentRouter;
