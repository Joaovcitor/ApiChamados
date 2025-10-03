"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chamados_service_1 = __importDefault(require("./chamados.service"));
class TicketController {
    async create(req, res) {
        const data = req.body;
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const ticket = await chamados_service_1.default.create(data, userId);
        return res.status(201).json(ticket);
    }
    async update(req, res) {
        const id = Number(req.params.id);
        const data = req.body;
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const ticket = await chamados_service_1.default.update(id, data, userId);
        return res.status(200).json(ticket);
    }
    async getAllTicketsUser(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const tickets = await chamados_service_1.default.getAllTicketsUser(userId);
        return res.status(200).json(tickets);
    }
    async getAllTicketsAssignee(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const tickets = await chamados_service_1.default.getAllTicketsAssignee(userId);
        return res.status(200).json(tickets);
    }
    async getAllTickets(req, res) {
        const tickets = await chamados_service_1.default.getAllTickets();
        return res.status(200).json(tickets);
    }
    async getTicketById(req, res) {
        const id = Number(req.params.id);
        const ticket = await chamados_service_1.default.getTicketById(id);
        return res.status(200).json(ticket);
    }
}
exports.default = new TicketController();
