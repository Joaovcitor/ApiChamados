import { BadRequestError } from "../../core/errors/appError";
import { prisma } from "../../core/prisma/prisma";
import {
  CategoriaDTO,
  CategoriaResponseDTO,
  CategoriaUpdateDTO,
} from "./categoria.dto";

class CategoriaService {
  async create(categoriaDto: CategoriaDTO) {
    const categoriaExist = await prisma.category.findFirst({
      where: { name: categoriaDto.name },
    });
    if (categoriaExist) {
      throw new BadRequestError("Categoria já existe");
    }
    const categoria = await prisma.category.create({
      data: {
        name: categoriaDto.name,
      },
    });
    return categoria;
  }

  async getAll(): Promise<CategoriaResponseDTO[]> {
    const categorias = await prisma.category.findMany();
    return categorias;
  }

  async getById(categoriaId: number): Promise<CategoriaResponseDTO> {
    const categoria = await prisma.category.findUnique({
      where: { id: categoriaId },
    });
    if (!categoria) {
      throw new BadRequestError("Categoria não existe");
    }
    return categoria;
  }

  async update(categoriaId: number, categoriaDto: CategoriaUpdateDTO) {
    const categoriaExist = await prisma.category.findUnique({
      where: { id: categoriaId },
    });
    if (!categoriaExist) {
      throw new BadRequestError("Categoria não existe");
    }
    const categoria = await prisma.category.update({
      where: { id: categoriaId },
      data: {
        name: categoriaDto.name,
      },
    });
    return categoria;
  }
}

export default new CategoriaService();
