import { Router } from "express";
import userRouter from "../../modules/user/user.routes";
import authRouter from "../../modules/auth/auth.routes";
import categoriaRouter from "../../modules/categoria/categoria.routes";
import ticketRouter from "../../modules/chamados/chamados.routes";
import commentRouter from "../../modules/comentarios/comentarios.routes";
import departmentRouter from "../../modules/department/department.routes";
const routesGlobal = Router();
routesGlobal.use("/user", userRouter);
routesGlobal.use("/auth", authRouter);
routesGlobal.use("/categoria", categoriaRouter);
routesGlobal.use("/tickets", ticketRouter);
routesGlobal.use("/comments", commentRouter);
routesGlobal.use("/department", departmentRouter);

export default routesGlobal;
