/**
 * Archivo: src/controllers/category.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Controlador para gestionar las categorías de equipos dentro del sistema Rentool.
 */

import { Request, Response } from "express";
import { Category, CategoryI } from "../models/Category";

export class CategoryController {
  // Obtener todas las categorías activas
  public async getAllCategories(req: Request, res: Response) {
    try {
      const categories: CategoryI[] = await Category.findAll({
        where: { status: "ACTIVE" },
      });
      res.status(200).json( categories );
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las categorías" });
    }
  }

  // Obtener una categoría por ID
  public async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await Category.findOne({
        where: { id, status: "ACTIVE" },
      });
      category
        ? res.status(200).json( category )
        : res.status(404).json({ error: "Categoría no encontrada o inactiva" });
    } catch (error) {
      res.status(500).json({ error: "Error al buscar la categoría" });
    }
  }

  // Crear una nueva categoría
  public async createCategory(req: Request, res: Response) {
    const { name, description, status } = req.body;
    try {
      const newCategory = await Category.create({ name, description, status });
      res.status(201).json(newCategory);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una categoría
  public async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, status } = req.body;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }
      await category.update({ name, description, status });
      res.status(200).json(category);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminación física
  public async deleteCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category)
      return res.status(404).json({ error: "Categoría no encontrada" });

    // ⚠️ Elimina solo de la tabla 'categories', ignorando restricciones de FK
    await Category.sequelize?.query(
      `DELETE FROM categories WHERE id = :id`,
      { replacements: { id } }
    );

    res.status(200).json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
}


  // Eliminación lógica
  public async deleteCategoryAdv(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ where: { id, status: "ACTIVE" } });
      if (!category)
        return res.status(404).json({ error: "Categoría no encontrada" });

      await category.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Categoría marcada como inactiva" });
    } catch (error) {
      res.status(500).json({ error: "Error al marcar la categoría como inactiva" });
    }
  }
}
