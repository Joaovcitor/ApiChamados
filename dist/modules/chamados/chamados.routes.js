"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketRouter = (0, express_1.Router)();
const chamados_controller_1 = __importDefault(require("./chamados.controller"));
const isAuthenticated_middleware_1 = require("../../core/middlewares/isAuthenticated.middleware");
ticketRouter.post("/", isAuthenticated_middleware_1.isAuthenticated, chamados_controller_1.default.create);
ticketRouter.get("/user", isAuthenticated_middleware_1.isAuthenticated, chamados_controller_1.default.getAllTicketsUser);
ticketRouter.get("/assignee", isAuthenticated_middleware_1.isAuthenticated, chamados_controller_1.default.getAllTicketsAssignee);
// rotas específicas
ticketRouter.get("/", isAuthenticated_middleware_1.isAuthenticated, chamados_controller_1.default.getAllTickets);
ticketRouter.get("/:id", isAuthenticated_middleware_1.isAuthenticated, chamados_controller_1.default.getTicketById);
ticketRouter.put("/:id", isAuthenticated_middleware_1.isAuthenticated, chamados_controller_1.default.update);
exports.default = ticketRouter;
