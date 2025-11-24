import { BadRequestError, NotFoundError } from "../../core/errors/appError";
import { prisma } from "../../core/prisma/prisma";
import {
  CreateInventoryDTO,
  UpdateInventoryDTO,
  type MovimentacaoDTO,
} from "./inventory.dto";

class InventoryService {
  async create(data: CreateInventoryDTO) {
    const inventory = await prisma.itemInventario.create({
      data,
    });
    return inventory;
  }
  async createInventoryMovement(data: MovimentacaoDTO) {
    return await prisma.$transaction(async (tsx) => {
      const item = await tsx.itemInventario.findUnique({
        where: { id: data.itemId },
      });
      if (!item) {
        throw new NotFoundError("Item de inventário não encontrado");
      }
      if (data.tipo === "saida" && data.quantidade > item.quantidade) {
        throw new BadRequestError("Quantidade insuficiente para saída");
      }
      const operations =
        data.tipo === "entrada"
          ? { increment: data.quantidade }
          : { decrement: data.quantidade };
      await tsx.itemInventario.update({
        where: { id: data.itemId },
        data: { quantidade: operations },
      });
      const movimentacao = await tsx.movimentacaoInventario.create({ data });
      return movimentacao;
    });
  }
  async getMovimentacaoByItemId(itemId: number) {
    const movimentacoes = await prisma.movimentacaoInventario.findMany({
      where: { itemId },
    });
    return movimentacoes;
  }
  async update(id: number, data: UpdateInventoryDTO) {
    const inventory = await prisma.itemInventario.update({
      where: {
        id,
      },
      data,
    });
    return inventory;
  }
  async getAll() {
    const inventory = await prisma.itemInventario.findMany();
    return inventory;
  }
}
export default new InventoryService();
