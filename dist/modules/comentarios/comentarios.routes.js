"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuthenticated_middleware_1 = require("../../core/middlewares/isAuthenticated.middleware");
const comentarios_controller_1 = __importDefault(require("./comentarios.controller"));
const commentRouter = (0, express_1.Router)();
commentRouter.post("/:chamadoId", isAuthenticated_middleware_1.isAuthenticated, comentarios_controller_1.default.create);
commentRouter.put("/:commentId", isAuthenticated_middleware_1.isAuthenticated, comentarios_controller_1.default.update);
commentRouter.get("/:chamadoId", isAuthenticated_middleware_1.isAuthenticated, comentarios_controller_1.default.getCommentsByChamadoId);
exports.default = commentRouter;
