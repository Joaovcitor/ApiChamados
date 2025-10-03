import {
  type CommentCreateDTO,
  type CommentUpdateDTO,
} from "./comentarios.dto";
import { Request, Response } from "express";
import comentariosService from "./comentarios.service";
import { UnauthorizedError } from "../../core/errors/appError";

class CommentController {
  async create(req: Request, res: Response) {
    const { content } = req.body as CommentCreateDTO;
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError("Usuário não autenticado");
    }
    const chamadoId = Number(req.params.chamadoId);
    const comment = await comentariosService.create(
      { content },
      userId,
      chamadoId
    );
    res.status(201).json(comment);
  }
  async update(req: Request, res: Response) {
    const { content } = req.body as CommentUpdateDTO;
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError("Usuário não autenticado");
    }
    const commentId = Number(req.params.commentId);
    const updatedComment = await comentariosService.update(
      { content },
      userId,
      commentId
    );
    res.status(200).json(updatedComment);
  }
  async getCommentsByChamadoId(req: Request, res: Response) {
    const chamadoId = Number(req.params.chamadoId);
    const comments = await comentariosService.getCommentsByChamadoId(chamadoId);
    res.status(200).json(comments);
  }
}

export default new CommentController();
