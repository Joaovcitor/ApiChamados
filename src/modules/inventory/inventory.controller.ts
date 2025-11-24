import { Request, Response } from "express";
import { CreateInventoryDTO, type MovimentacaoDTO } from "./inventory.dto";
import inventoryService from "./inventory.service";
import { sendCreated, sendSuccess } from "../../core/utils/responseHandler";

class InventoryController {
  async data(req: Request, res: Response) {
    const data = req.body as CreateInventoryDTO;
    const userId = req.user?.id;
    data.usuarioResponsavelId = userId!;
    const inventory = await inventoryService.create(data);
    console.log(inventory);
    return sendCreated(res, inventory);
  }
  async movimentacaoCreate(req: Request, res: Response) {
    const userId = req.user?.id;
    const data: MovimentacaoDTO = req.body;
    data.responsavelId = userId!;
    const movimentacao = await inventoryService.createInventoryMovement(data);
    return sendCreated(res, movimentacao);
  }
  async getMovimentacaoByItemId(req: Request, res: Response) {
    const itemId = Number(req.params.itemId);
    const movimentacoes = await inventoryService.getMovimentacaoByItemId(
      itemId
    );
    return sendSuccess(res, movimentacoes);
  }
  async getAll(req: Request, res: Response) {
    const inventory = await inventoryService.getAll();
    console.log(inventory);
    return sendSuccess(res, inventory);
  }
}
export default new InventoryController();
