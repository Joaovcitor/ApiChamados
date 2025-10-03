import {
  TicketCreateDTO,
  TicketUpdateDTO,
  TicketResponseDTO,
} from "./chamados.dto";
import TicketService from "./chamados.service";
import { Request, Response } from "express";

class TicketController {
  async create(req: Request, res: Response) {
    const data: TicketCreateDTO = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const ticket = await TicketService.create(data, userId);
    return res.status(201).json(ticket);
  }
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data: TicketUpdateDTO = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const ticket = await TicketService.update(id, data, userId);
    return res.status(200).json(ticket);
  }
  async getAllTicketsUser(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tickets = await TicketService.getAllTicketsUser(userId);
    return res.status(200).json(tickets);
  }
  async getAllTicketsAssignee(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tickets = await TicketService.getAllTicketsAssignee(userId);
    return res.status(200).json(tickets);
  }
  async getAllTickets(req: Request, res: Response) {
    const tickets = await TicketService.getAllTickets();
    return res.status(200).json(tickets);
  }
  async getTicketById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ticket = await TicketService.getTicketById(id);
    return res.status(200).json(ticket);
  }
}

export default new TicketController();
