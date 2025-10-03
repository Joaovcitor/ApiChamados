import { Request, Response } from "express";
import CategoriaService from "./categoria.service";
import type { CategoriaDTO, CategoriaUpdateDTO } from "./categoria.dto";

class CategoriaController {
  async create(req: Request, res: Response) {
    const categoriaDto = req.body as CategoriaDTO;
    const categoria = await CategoriaService.create(categoriaDto);
    res.status(201).json(categoria);
  }
  async getAll(req: Request, res: Response) {
    const categorias = await CategoriaService.getAll();
    res.status(200).json(categorias);
  }
  async getById(req: Request, res: Response) {
    const categoriaId = Number(req.params.id);
    const categoria = await CategoriaService.getById(categoriaId);
    res.status(200).json(categoria);
  }
  async update(req: Request, res: Response) {
    const categoriaId = Number(req.params.id);
    const categoriaDto = req.body as CategoriaUpdateDTO;
    const categoria = await CategoriaService.update(categoriaId, categoriaDto);
    res.status(200).json(categoria);
  }
}

export default new CategoriaController();
