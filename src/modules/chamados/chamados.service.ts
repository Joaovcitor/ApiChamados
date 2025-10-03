import {
  TicketCreateDTO,
  TicketUpdateDTO,
  TicketResponseDTO,
} from "./chamados.dto";
import { prisma } from "../../core/prisma/prisma";
import { PriorityChamado, StatusChamado } from "@prisma/client";
import { NotFoundError } from "../../core/errors/appError";

class TicketService {
  async create(data: TicketCreateDTO, userId: number) {
    const ticket = await prisma.chamado.create({
      data: {
        ...data,
        categoryId: Number(data.categoryId),
        requesterId: userId,
      },
    });
    return ticket;
  }
  async update(id: number, data: TicketUpdateDTO, userId: number) {
    const ticket = await prisma.chamado.update({
      where: {
        id: id,
        assigneeId: userId,
      },
      data,
    });
    return ticket;
  }
  async getAllTicketsUser(userId: number) {
    const tickets = await prisma.chamado.findMany({
      where: {
        requesterId: userId,
      },
    });
    return tickets;
  }
  async getAllTicketsAssignee(userId: number) {
    const tickets = await prisma.chamado.findMany({
      where: {
        assigneeId: userId,
      },
    });
    return tickets;
  }
  async getAllTickets() {
    const tickets = await prisma.chamado.findMany({
      where: { assigneeId: null },
    });
    return tickets;
  }
  async getTicketById(id: number) {
    const ticket = await prisma.chamado.findUnique({
      where: {
        id: id,
      },
    });
    if (!ticket) {
      throw new NotFoundError("Ticket not found");
    }
    return ticket;
  }
}

export default new TicketService();
