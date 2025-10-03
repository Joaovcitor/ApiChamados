"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../core/prisma/prisma");
const appError_1 = require("../../core/errors/appError");
class CommentService {
    async create(data, userId, chamadoId) {
        const chamado = await prisma_1.prisma.chamado.findUnique({
            where: {
                id: chamadoId,
            },
        });
        if (!chamado) {
            throw new appError_1.BadRequestError("Chamado não encontrado");
        }
        const comment = await prisma_1.prisma.comment.create({
            data: {
                content: data.content,
                userId: userId,
                chamadoId,
            },
        });
        return comment;
    }
    async update(data, userId, commentId) {
        const comment = await prisma_1.prisma.comment.findUnique({
            where: {
                id: commentId,
            },
        });
        if (!comment) {
            throw new appError_1.BadRequestError("Comentário não encontrado");
        }
        if (comment.userId !== userId) {
            throw new appError_1.BadRequestError("Você não tem permissão para atualizar este comentário");
        }
        const updatedComment = await prisma_1.prisma.comment.update({
            where: {
                id: commentId,
            },
            data: {
                content: data.content,
            },
        });
        return updatedComment;
    }
    async getCommentsByChamadoId(chamadoId) {
        const comments = await prisma_1.prisma.comment.findMany({
            where: {
                chamadoId,
            },
        });
        return comments;
    }
}
exports.default = new CommentService();
