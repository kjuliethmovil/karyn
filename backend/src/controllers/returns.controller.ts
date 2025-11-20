/**
 * Archivo: src/controllers/returns.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Controlador para la gestión de devoluciones de equipos alquilados dentro de Rentool.
 */

import { Request, Response } from "express";
import { Returns, ReturnsI } from "../models/Returns";

export class ReturnsController {
  // Obtener todas las devoluciones activas
  public async getAllReturns(req: Request, res: Response) {
    try {
      const returns = await Returns.findAll({ where: { status: "ACTIVE" } });
      res.status(200).json( returns );
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las devoluciones" });
    }
  }

  // Obtener devolución por ID
  public async getReturnById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const returned = await Returns.findOne({ where: { id, status: "ACTIVE" } });
      returned
        ? res.status(200).json({ returned })
        : res.status(404).json({ error: "Devolución no encontrada o inactiva" });
    } catch (error) {
      res.status(500).json({ error: "Error al buscar la devolución" });
    }
  }

  // Crear devolución
  public async createReturn(req: Request, res: Response) {
    const { contract_id, date, condition, damage_cost, observations, status } = req.body;
    try {
      const newReturn = await Returns.create({
        contract_id,
        date,
        condition,
        damage_cost,
        observations,
        status,
      });
      res.status(201).json(newReturn);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar devolución
  public async updateReturn(req: Request, res: Response) {
    const { id } = req.params;
    const { contract_id, date, condition, damage_cost, observations, status } = req.body;
    try {
      const returned = await Returns.findByPk(id);
      if (!returned)
        return res.status(404).json({ error: "Devolución no encontrada" });

      await returned.update({
        contract_id,
        date,
        condition,
        damage_cost,
        observations,
        status,
      });
      res.status(200).json(returned);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminación física
  public async deleteReturn(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const returned = await Returns.findByPk(id);
      if (!returned)
        return res.status(404).json({ error: "Devolución no encontrada" });

      await returned.destroy();
      res.status(200).json({ message: "Devolución eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la devolución" });
    }
  }

  // Eliminación lógica
  public async deleteReturnAdv(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const returned = await Returns.findOne({ where: { id, status: "ACTIVE" } });
      if (!returned)
        return res.status(404).json({ error: "Devolución no encontrada" });

      await returned.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Devolución marcada como inactiva" });
    } catch (error) {
      res.status(500).json({ error: "Error al marcar la devolución como inactiva" });
    }
  }
}
