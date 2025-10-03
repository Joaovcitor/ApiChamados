"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoria_service_1 = __importDefault(require("./categoria.service"));
class CategoriaController {
    async create(req, res) {
        const categoriaDto = req.body;
        const categoria = await categoria_service_1.default.create(categoriaDto);
        res.status(201).json(categoria);
    }
    async getAll(req, res) {
        const categorias = await categoria_service_1.default.getAll();
        res.status(200).json(categorias);
    }
    async getById(req, res) {
        const categoriaId = Number(req.params.id);
        const categoria = await categoria_service_1.default.getById(categoriaId);
        res.status(200).json(categoria);
    }
    async update(req, res) {
        const categoriaId = Number(req.params.id);
        const categoriaDto = req.body;
        const categoria = await categoria_service_1.default.update(categoriaId, categoriaDto);
        res.status(200).json(categoria);
    }
}
exports.default = new CategoriaController();
