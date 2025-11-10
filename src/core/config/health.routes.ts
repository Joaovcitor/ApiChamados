import { Request, Response, Router } from "express";
import { prisma } from "../prisma/prisma";
const healthRouter = Router();

healthRouter.get("/", async (req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: new Date().toISOString(),
    dependencies: {
      database: "OK",
    },
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json(data);
  } catch (e: any) {
    data.message = "Serviço Indisponível";
    data.dependencies.database = "Serviço Indisponível";
    return res.status(503).json(data);
  }
});

export default healthRouter;
