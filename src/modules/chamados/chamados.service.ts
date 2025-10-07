import {
  TicketCreateDTO,
  TicketUpdateDTO,
  TicketResponseDTO,
} from "./chamados.dto";
import { prisma } from "../../core/prisma/prisma";
import { PriorityChamado, StatusChamado, type Chamado } from "@prisma/client";
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
      },
      data: {
        ...data,
        assigneeId: Number(userId),
      },
    });
    return ticket;
  }
  async UserCloseTicket(id: number, userId: number) {
    const ticket = await prisma.chamado.update({
      where: {
        id: id,
        requesterId: Number(userId),
      },
      data: {
        status: StatusChamado.CLOSED,
      },
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
  async getTicketById(id: number, userId: number) {
    const ticket = await prisma.chamado.findUnique({
      where: {
        id: id,
      },
    });
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    if (
      user.role === "AGENT" &&
      ticket?.assigneeId &&
      ticket.assigneeId !== userId
    ) {
      throw new NotFoundError("Ticket not found");
    }
    if (!ticket) {
      throw new NotFoundError("Ticket not found");
    }
    return ticket;
  }
  async ticketsOfDepartment(departmentId: number): Promise<Chamado[]> {
    const tickets = await prisma.chamado.findMany({
      where: {
        departmentId: departmentId,
      },
    });
    return tickets;
  }
}

export default new TicketService();
