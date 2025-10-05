import { Router } from "express";
const ticketRouter = Router();
import TicketController from "./chamados.controller";

import { isAuthenticated } from "../../core/middlewares/isAuthenticated.middleware";

ticketRouter.post("/", isAuthenticated, TicketController.create);
ticketRouter.get("/user", isAuthenticated, TicketController.getAllTicketsUser);
ticketRouter.get(
  "/assignee",
  isAuthenticated,
  TicketController.getAllTicketsAssignee
);
ticketRouter.get(
  "/department/:departmentId",
  isAuthenticated,
  TicketController.ticketsOfDepartment
);

// rotas específicas
ticketRouter.get("/", isAuthenticated, TicketController.getAllTickets);
ticketRouter.get("/:id", isAuthenticated, TicketController.getTicketById);
ticketRouter.put("/:id", isAuthenticated, TicketController.update);

export default ticketRouter;
