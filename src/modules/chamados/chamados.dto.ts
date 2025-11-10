import type { PriorityChamado, StatusChamado, Chamado } from "@prisma/client";

export interface TicketCreateDTO {
  title: string;
  description: string;
  categoryId: number;
  departmentId?: number;
  onlyOneAssignee: boolean;
  assigneeIds?: number[];
}

export interface TicketUpdateDTO {
  categoryId?: number;
  status?: StatusChamado;
  priority?: PriorityChamado;
  onlyOneAssignee?: boolean;
}

export interface TicketResponseDTO {
  id: number;
  title: string;
  description: string;
  status: StatusChamado;
  priority: PriorityChamado;
  categoryId: number;
  requesterId: number;
  assignees?: { id: number; name: string }[];
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type PaginatedChamados = {
  data: Chamado[];
  total: number;
  currentPage: number;
  totalPages: number;
};
