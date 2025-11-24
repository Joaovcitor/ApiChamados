import { Router } from "express";
import userRouter from "../../modules/user/user.routes";
import authRouter from "../../modules/auth/auth.routes";
import categoriaRouter from "../../modules/categoria/categoria.routes";
import ticketRouter from "../../modules/chamados/chamados.routes";
import commentRouter from "../../modules/comentarios/comentarios.routes";
import departmentRouter from "../../modules/department/department.routes";
import healthRouter from "./health.routes";
import inventoryRouter from "../../modules/inventory/inventory.routes";

const routesGlobal = Router();
routesGlobal.use("/user", userRouter);
routesGlobal.use("/auth", authRouter);
routesGlobal.use("/categoria", categoriaRouter);
routesGlobal.use("/tickets", ticketRouter);
routesGlobal.use("/comments", commentRouter);
routesGlobal.use("/department", departmentRouter);
routesGlobal.use("/health", healthRouter);
routesGlobal.use("/inventory", inventoryRouter);

export default routesGlobal;
