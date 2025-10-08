import {
  type CommentCreateDTO,
  type CommentUpdateDTO,
} from "./comentarios.dto";
import { prisma } from "../../core/prisma/prisma";
import { BadRequestError } from "../../core/errors/appError";

class CommentService {
  async create(data: CommentCreateDTO, userId: number, chamadoId: number) {
    const chamado = await prisma.chamado.findUnique({
      where: {
        id: chamadoId,
      },
    });
    if (!chamado) {
      throw new BadRequestError("Chamado não encontrado");
    }
    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        userId: userId,
        chamadoId,
      },
    });
    return comment;
  }
  async update(data: CommentUpdateDTO, userId: number, commentId: number) {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new BadRequestError("Comentário não encontrado");
    }
    if (comment.userId !== userId) {
      throw new BadRequestError(
        "Você não tem permissão para atualizar este comentário"
      );
    }
    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: data.content,
      },
    });
    return updatedComment;
  }
  async getCommentsByChamadoId(chamadoId: number) {
    const comments = await prisma.comment.findMany({
      where: {
        chamadoId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return comments;
  }
}

export default new CommentService();
