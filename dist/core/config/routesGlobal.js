"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("../../modules/user/user.routes"));
const auth_routes_1 = __importDefault(require("../../modules/auth/auth.routes"));
const categoria_routes_1 = __importDefault(require("../../modules/categoria/categoria.routes"));
const chamados_routes_1 = __importDefault(require("../../modules/chamados/chamados.routes"));
const comentarios_routes_1 = __importDefault(require("../../modules/comentarios/comentarios.routes"));
const routesGlobal = (0, express_1.Router)();
routesGlobal.use("/user", user_routes_1.default);
routesGlobal.use("/auth", auth_routes_1.default);
routesGlobal.use("/categoria", categoria_routes_1.default);
routesGlobal.use("/tickets", chamados_routes_1.default);
routesGlobal.use("/comments", comentarios_routes_1.default);
exports.default = routesGlobal;
