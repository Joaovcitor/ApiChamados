import {
  type CommentCreateDTO,
  type CommentUpdateDTO,
} from "./comentarios.dto";
import { Request, Response } from "express";
import comentariosService from "./comentarios.service";
import { UnauthorizedError } from "../../core/errors/appError";
import { io } from "../../app";
class CommentController {
  async create(req: Request, res: Response) {
    const { content } = req.body as CommentCreateDTO;
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedError("Usuário não autenticado");
    }
    const ticket = Number(req.params.chamadoId);
    const comment = await comentariosService.create(
      { content },
      userId,
      ticket
    );
    const chamadoId = comment.chamadoId;
    console.log(
      `[EMIT] Tentando emitir 'newComment' para a sala: ticket:${chamadoId}`
    );

    // 2. Verifique QUANTOS clientes estão nessa sala AGORA.
    const clientsInRoom = io.sockets.adapter.rooms.get(`ticket:${chamadoId}`);
    const numClients = clientsInRoom ? clientsInRoom.size : 0;
    console.log(
      `[EMIT] Número de clientes na sala ticket:${chamadoId} -> ${numClients}`
    );

    // --- FIM DOS LOGS DE DEBUG ---

    // A linha que realmente envia o evento
    io.to(`ticket:${chamadoId}`).emit("newComment", { comment });
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
