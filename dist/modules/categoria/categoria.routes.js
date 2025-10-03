"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_controller_1 = __importDefault(require("./categoria.controller"));
const isAuthenticated_middleware_1 = require("../../core/middlewares/isAuthenticated.middleware");
const categoriaRouter = (0, express_1.Router)();
categoriaRouter.post("/", isAuthenticated_middleware_1.isAuthenticated, categoria_controller_1.default.create);
categoriaRouter.get("/", isAuthenticated_middleware_1.isAuthenticated, categoria_controller_1.default.getAll);
categoriaRouter.get("/:id", isAuthenticated_middleware_1.isAuthenticated, categoria_controller_1.default.getById);
categoriaRouter.put("/:id", isAuthenticated_middleware_1.isAuthenticated, categoria_controller_1.default.update);
exports.default = categoriaRouter;
