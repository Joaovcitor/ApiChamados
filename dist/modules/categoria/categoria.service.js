"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../../core/errors/appError");
const prisma_1 = require("../../core/prisma/prisma");
class CategoriaService {
    async create(categoriaDto) {
        const categoriaExist = await prisma_1.prisma.category.findFirst({
            where: { name: categoriaDto.name },
        });
        if (categoriaExist) {
            throw new appError_1.BadRequestError("Categoria já existe");
        }
        const categoria = await prisma_1.prisma.category.create({
            data: {
                name: categoriaDto.name,
            },
        });
        return categoria;
    }
    async getAll() {
        const categorias = await prisma_1.prisma.category.findMany();
        return categorias;
    }
    async getById(categoriaId) {
        const categoria = await prisma_1.prisma.category.findUnique({
            where: { id: categoriaId },
        });
        if (!categoria) {
            throw new appError_1.BadRequestError("Categoria não existe");
        }
        return categoria;
    }
    async update(categoriaId, categoriaDto) {
        const categoriaExist = await prisma_1.prisma.category.findUnique({
            where: { id: categoriaId },
        });
        if (!categoriaExist) {
            throw new appError_1.BadRequestError("Categoria não existe");
        }
        const categoria = await prisma_1.prisma.category.update({
            where: { id: categoriaId },
            data: {
                name: categoriaDto.name,
            },
        });
        return categoria;
    }
}
exports.default = new CategoriaService();
