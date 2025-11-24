import {
  TicketCreateDTO,
  TicketUpdateDTO,
  type PaginatedChamados,
} from "./chamados.dto";
import { prisma } from "../../core/prisma/prisma";
import { StatusChamado, type Chamado } from "@prisma/client";
import { BadRequestError, NotFoundError } from "../../core/errors/appError";

class TicketService {
  async create(data: TicketCreateDTO, userId: number): Promise<Chamado> {
    // validação de quantidade de responsáveis quando onlyOneAssignee = true
    if (data.onlyOneAssignee && (data.assigneeIds?.length ?? 0) > 1) {
      throw new BadRequestError(
        "Este chamado permite apenas um responsável (onlyOneAssignee = true)"
      );
    }

    const result = await prisma.$transaction(async (tsx) => {
      // se tiver departmentId, validar se todos os assignees pertencem ao departamento
      if (data.departmentId && data.assigneeIds?.length) {
        const usersInDepartment = await tsx.listDepartmentUser.findMany({
          where: { departmentId: data.departmentId },
          select: { userId: true },
        });
        const allowedUserIds = new Set(usersInDepartment.map((u) => u.userId));
        const invalidAssignees = data.assigneeIds.filter(
          (id) => !allowedUserIds.has(id)
        );
        if (invalidAssignees.length > 0) {
          throw new BadRequestError(
            `Alguns usuários não pertencem ao departamento informado: ${invalidAssignees.join(
              ", "
            )}`
          );
        }
      }

      const ticket = await tsx.chamado.create({
        data: {
          title: data.title,
          description: data.description,
          categoryId: Number(data.categoryId),
          requesterId: userId,
          departmentId: data.departmentId ?? null,
          onlyOneAssignee: !!data.onlyOneAssignee,
        },
      });

      if (data.assigneeIds?.length) {
        await tsx.userManyAssignees.createMany({
          data: data.assigneeIds.map((id) => ({
            chamadoId: ticket.id,
            userId: id,
          })),
        });
      }

      // retornar com assignees
      const withAssignees = await tsx.chamado.findUnique({
        where: { id: ticket.id },
        include: {
          manyAssignees: {
            include: { user: { select: { id: true, name: true } } },
          },
          category: true,
          department: true,
        },
      });
      return withAssignees as Chamado;
    });

    return result;
  }

  async update(id: number, data: TicketUpdateDTO) {
    const ticket = await prisma.chamado.findUnique({ where: { id } });
    if (ticket?.status === StatusChamado.CLOSED) {
      throw new BadRequestError("Chamado está fechado e não pode ser editado");
    }
    if (!ticket) {
      throw new NotFoundError("Chamado não encontrado");
    }
    return await prisma.chamado.update({
      where: { id },
      data,
    });
  }

  async userCloseTicket(id: number, userId: number) {
    try {
      return await prisma.chamado.update({
        where: { id, requesterId: userId },
        data: { status: StatusChamado.CLOSED },
      });
    } catch {
      throw new NotFoundError("Chamado não encontrado ou sem permissão");
    }
  }

  async getAllTicketsUser(userId: number) {
    return prisma.chamado.findMany({
      where: { requesterId: userId },
      include: {
        manyAssignees: {
          include: { user: { select: { id: true, name: true } } },
        },
        category: true,
        department: true,
      },
    });
  }

  async getAllTicketsAssignee(userId: number) {
    return prisma.chamado.findMany({
      where: { manyAssignees: { some: { userId } } },
      include: {
        manyAssignees: {
          include: { user: { select: { id: true, name: true } } },
        },
        category: true,
        department: true,
      },
    });
  }

  async getUnassignedTickets() {
    return prisma.chamado.findMany({
      where: { manyAssignees: { none: {} } },
      include: {
        manyAssignees: {
          include: { user: { select: { id: true, name: true } } },
        },
        category: true,
        department: true,
      },
    });
  }

  async getTicketById(id: number, userId: number) {
    const [ticket, user] = await Promise.all([
      prisma.chamado.findUnique({
        where: { id },
        include: {
          manyAssignees: {
            include: { user: { select: { id: true, name: true } } },
          },
          category: true,
          department: true,
        },
      }),
      prisma.user.findUnique({ where: { id: userId } }),
    ]);

    if (!user) throw new NotFoundError("Usuário não encontrado");
    if (!ticket) throw new NotFoundError("Chamado não encontrado");

    return ticket;
  }

  async ticketsOfDepartment(
    departmentId: number,
    page: number,
    pageSize: number
  ): Promise<PaginatedChamados> {
    const validPage = Math.max(1, page);
    const skip = (validPage - 1) * pageSize;
    const whereClause = {
      departmentId,
    };
    const [data, total] = await prisma.$transaction([
      prisma.chamado.findMany({
        where: whereClause,
        include: {
          manyAssignees: {
            include: { user: { select: { id: true, name: true } } },
          },
          category: true,
          department: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.chamado.count({ where: whereClause }),
    ]);
    return {
      data,
      total,
      currentPage: validPage,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async addAssignees(ticketId: number, assigneesId: number[]) {
    const ticket = await prisma.chamado.findUnique({
      where: { id: ticketId },
      include: { manyAssignees: true },
    });
    if (!ticket) throw new NotFoundError("Chamado não encontrado!");
    if (ticket.onlyOneAssignee && assigneesId.length > 1) {
      throw new BadRequestError("Este chamado permite apenas um responsável");
    }
    if (ticket.manyAssignees.find((uId) => assigneesId.includes(uId.userId))) {
      throw new BadRequestError(
        "Algum dos usuários já é responsável por esse chamado!"
      );
    }

    await prisma.userManyAssignees.createMany({
      data: assigneesId.map((userId) => ({ chamadoId: ticketId, userId })),
      skipDuplicates: true,
    });

    return { message: "Responsáveis adicionados com sucesso" };
  }

  async exitAssignee(ticketId: number, assigneeId: number) {
    const ticket = await this.findTicketById(ticketId);

    await prisma.userManyAssignees.deleteMany({
      where: { chamadoId: ticket.id, userId: assigneeId },
    });
    return { message: "Responsável removido com sucesso" };
  }

  private async findTicketById(id: number) {
    const ticket = await prisma.chamado.findUnique({ where: { id } });
    if (!ticket) throw new NotFoundError("Chamado não encontrado!");
    return ticket;
  }
}

export default new TicketService();
