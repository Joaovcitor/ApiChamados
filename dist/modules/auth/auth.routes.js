"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const isAuthenticated_middleware_1 = require("../../core/middlewares/isAuthenticated.middleware");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", auth_controller_1.default.login);
authRouter.get("/me", isAuthenticated_middleware_1.isAuthenticated, auth_controller_1.default.getUser);
exports.default = authRouter;
