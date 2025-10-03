"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routesGlobal_1 = __importDefault(require("./core/config/routesGlobal"));
const errorHandler_middleware_1 = require("./core/middlewares/errorHandler.middleware");
dotenv_1.default.config({
    path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.whiteList = ["http://localhost:8080"];
        this.setupMiddleware();
        this.setupRoutes();
    }
    setupMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, helmet_1.default)());
        this.setupCors();
        this.app.use(errorHandler_middleware_1.errorHandler);
    }
    setupCors() {
        const corsOptions = {
            origin: (origin, callback) => {
                if (!origin || this.whiteList.indexOf(origin) !== -1) {
                    callback(null, true);
                }
                else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            credentials: true,
        };
        this.app.use((0, cors_1.default)(corsOptions));
    }
    setupRoutes() {
        this.app.use("/apiv1", routesGlobal_1.default);
    }
    startServer() {
        const port = process.env.PORT || 3010;
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
exports.default = Server;
