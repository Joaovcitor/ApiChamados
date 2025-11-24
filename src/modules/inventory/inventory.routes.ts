import { Router } from "express";
import inventoryController from "./inventory.controller";
import { isAuthenticated } from "../../core/middlewares/isAuthenticated.middleware";
import { verifyRole } from "../../core/middlewares/verifyRole.middleware";

const inventoryRouter = Router();
inventoryRouter.get(
  "/",
  isAuthenticated,
  verifyRole(["ESTOQUE_MANAGER", "ESTOQUE_WATCHER"]),
  inventoryController.getAll
);
inventoryRouter.post(
  "/",
  isAuthenticated,
  verifyRole(["ESTOQUE_MANAGER"]),
  inventoryController.data
);
inventoryRouter.post(
  "/movimentacao",
  isAuthenticated,
  verifyRole(["ESTOQUE_MANAGER"]),
  inventoryController.movimentacaoCreate
);
inventoryRouter.get(
  "/movimentacao/item/:itemId",
  isAuthenticated,
  verifyRole(["ESTOQUE_MANAGER", "ESTOQUE_WATCHER"]),
  inventoryController.getMovimentacaoByItemId
);

export default inventoryRouter;
