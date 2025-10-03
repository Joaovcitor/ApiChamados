"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../core/prisma/prisma");
const appError_1 = require("../../core/errors/appError");
class TicketService {
    async create(data, userId) {
        const ticket = await prisma_1.prisma.chamado.create({
            data: {
                ...data,
                categoryId: Number(data.categoryId),
                requesterId: userId,
            },
        });
        return ticket;
    }
    async update(id, data, userId) {
        const ticket = await prisma_1.prisma.chamado.update({
            where: {
                id: id,
                assigneeId: userId,
            },
            data,
        });
        return ticket;
    }
    async getAllTicketsUser(userId) {
        const tickets = await prisma_1.prisma.chamado.findMany({
            where: {
                requesterId: userId,
            },
        });
        return tickets;
    }
    async getAllTicketsAssignee(userId) {
        const tickets = await prisma_1.prisma.chamado.findMany({
            where: {
                assigneeId: userId,
            },
        });
        return tickets;
    }
    async getAllTickets() {
        const tickets = await prisma_1.prisma.chamado.findMany({
            where: { assigneeId: null },
        });
        return tickets;
    }
    async getTicketById(id) {
        const ticket = await prisma_1.prisma.chamado.findUnique({
            where: {
                id: id,
            },
        });
        if (!ticket) {
            throw new appError_1.NotFoundError("Ticket not found");
        }
        return ticket;
    }
}
exports.default = new TicketService();
