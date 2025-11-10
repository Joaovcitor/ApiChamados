import {
  TicketCreateDTO,
  TicketUpdateDTO,
  TicketResponseDTO,
} from "./chamados.dto";
import TicketService from "./chamados.service";
import { Request, Response } from "express";
import {
  sendSuccess,
  sendSuccessMessage,
} from "../../core/utils/responseHandler";

class TicketController {
  async create(req: Request, res: Response) {
    const data: TicketCreateDTO = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const ticket = await TicketService.create(data, userId);
    return sendSuccess(res, ticket, 201);
  }
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data: TicketUpdateDTO = req.body;
    const ticket = await TicketService.update(id, data);
    return sendSuccess(res, ticket);
  }
  async getAllTicketsUser(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tickets = await TicketService.getAllTicketsUser(userId);
    return sendSuccess(res, tickets);
  }
  async getAllTicketsAssignee(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tickets = await TicketService.getAllTicketsAssignee(userId);
    return sendSuccess(res, tickets);
  }
  async getAllTickets(req: Request, res: Response) {
    const tickets = await TicketService.getUnassignedTickets();
    return sendSuccess(res, tickets);
  }
  async getTicketById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const ticket = await TicketService.getTicketById(id, userId);
    return sendSuccess(res, ticket);
  }
  async ticketsOfDepartment(req: Request, res: Response) {
    const departmentId = Number(req.params.departmentId);
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const tickets = await TicketService.ticketsOfDepartment(
      departmentId,
      page,
      pageSize
    );
    return sendSuccess(res, tickets);
  }

  async addAssignees(req: Request, res: Response) {
    const ticketId = Number(req.params.id);
    const assigneeIds = (req.body.assigneeIds ?? []) as number[];
    const result = await TicketService.addAssignees(ticketId, assigneeIds);
    return sendSuccess(res, result);
  }
  async exitAssignee(req: Request, res: Response) {
    const ticketId = Number(req.params.id);
    const assigneeIds = req.user?.id;
    await TicketService.exitAssignee(ticketId, assigneeIds!);
    return sendSuccessMessage(res, "Você saiu desse chamado");
  }
}

export default new TicketController();
