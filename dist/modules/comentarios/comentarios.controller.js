"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comentarios_service_1 = __importDefault(require("./comentarios.service"));
const appError_1 = require("../../core/errors/appError");
class CommentController {
    async create(req, res) {
        const { content } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            throw new appError_1.UnauthorizedError("Usuário não autenticado");
        }
        const chamadoId = Number(req.params.chamadoId);
        const comment = await comentarios_service_1.default.create({ content }, userId, chamadoId);
        res.status(201).json(comment);
    }
    async update(req, res) {
        const { content } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            throw new appError_1.UnauthorizedError("Usuário não autenticado");
        }
        const commentId = Number(req.params.commentId);
        const updatedComment = await comentarios_service_1.default.update({ content }, userId, commentId);
        res.status(200).json(updatedComment);
    }
    async getCommentsByChamadoId(req, res) {
        const chamadoId = Number(req.params.chamadoId);
        const comments = await comentarios_service_1.default.getCommentsByChamadoId(chamadoId);
        res.status(200).json(comments);
    }
}
exports.default = new CommentController();
