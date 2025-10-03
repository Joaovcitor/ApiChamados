"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isAuthenticated_middleware_1 = require("../../core/middlewares/isAuthenticated.middleware");
const user_controller_1 = __importDefault(require("./user.controller"));
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.post("/comum", isAuthenticated_middleware_1.isAuthenticated, user_controller_1.default.createUserComum);
userRouter.post("/admin", isAuthenticated_middleware_1.isAuthenticated, user_controller_1.default.createUserAdmin);
exports.default = userRouter;
