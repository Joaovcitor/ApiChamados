import "express-async-errors";
import express, { type Application } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { whiteList } from "./core/config/whiteList";
import cookieParser from "cookie-parser";
import cors, { type CorsOptions } from "cors";
import routesGlobal from "./core/config/routesGlobal";
import { errorHandler } from "./core/middlewares/errorHandler.middleware";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

class Server {
  public app: Application;
  private readonly whiteList: string[];
  constructor() {
    this.app = express();
    this.whiteList = ["http://localhost:8080"];
    this.setupMiddleware();
    this.setupRoutes();
    this.app.use(errorHandler);
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.setupCors();
  }

  private setupCors(): void {
    const corsOptions: CorsOptions = {
      origin: (origin, callback) => {
        if (!origin || this.whiteList.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    };
    this.app.use(cors(corsOptions));
  }

  private setupRoutes(): void {
    this.app.use("/apiv1", routesGlobal);
  }

  public startServer(): void {
    const port = process.env.PORT || 3010;
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

export default Server;
