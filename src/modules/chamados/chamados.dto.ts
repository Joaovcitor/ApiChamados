import type { PriorityChamado, StatusChamado } from "@prisma/client";

export interface TicketCreateDTO {
  title: string;
  description: string;
  categoryId: number;
  departmentId?: number;
}

export interface TicketUpdateDTO {
  categoryId?: number;
  status?: StatusChamado;
  priority?: PriorityChamado;
}

export interface TicketResponseDTO {
  id: number;
  title: string;
  description: string;
  status: StatusChamado;
  priority: PriorityChamado;
  categoryId: number;
  requesterId: number;
  assigneeId?: number;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
