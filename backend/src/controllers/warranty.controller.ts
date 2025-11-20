/**
 * Archivo: src/controllers/warranty.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Controlador para la gestión de garantías de equipos alquilados.
 */

import { Request, Response } from "express";
import { Warranty, WarrantyI } from "../models/Warranty";

export class WarrantyController {
  // Obtener todas las garantías activas
  public async getAllWarranties(req: Request, res: Response) {
    try {
      const warranties = await Warranty.findAll({
        where: { status: "ACTIVE" },
      });
      res.status(200).json( warranties );
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las garantías" });
    }
  }

  // Obtener garantía por ID
  public async getWarrantyById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const warranty = await Warranty.findOne({
        where: { id, status: "ACTIVE" },
      });
      warranty
        ? res.status(200).json({ warranty })
        : res.status(404).json({ error: "Garantía no encontrada o inactiva" });
    } catch (error) {
      res.status(500).json({ error: "Error al buscar la garantía" });
    }
  }

  // Crear garantía
  public async createWarranty(req: Request, res: Response) {
    const { contract_id, equipment_id, issue_date, expiration_date, description, status } = req.body;
    try {
      const newWarranty = await Warranty.create({
        contract_id,
        equipment_id,
        issue_date,
        expiration_date,
        description,
        status,
      });
      res.status(201).json(newWarranty);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar garantía
  public async updateWarranty(req: Request, res: Response) {
    const { id } = req.params;
    const { contract_id, equipment_id, issue_date, expiration_date, description, status } = req.body;
    try {
      const warranty = await Warranty.findByPk(id);
      if (!warranty)
        return res.status(404).json({ error: "Garantía no encontrada" });

      await warranty.update({
        contract_id,
        equipment_id,
        issue_date,
        expiration_date,
        description,
        status,
      });
      res.status(200).json(warranty);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminación física
  public async deleteWarranty(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const warranty = await Warranty.findByPk(id);
      if (!warranty)
        return res.status(404).json({ error: "Garantía no encontrada" });

      await warranty.destroy();
      res.status(200).json({ message: "Garantía eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la garantía" });
    }
  }

  // Eliminación lógica
  public async deleteWarrantyAdv(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const warranty = await Warranty.findOne({ where: { id, status: "ACTIVE" } });
      if (!warranty)
        return res.status(404).json({ error: "Garantía no encontrada" });

      await warranty.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Garantía marcada como inactiva" });
    } catch (error) {
      res.status(500).json({ error: "Error al marcar la garantía como inactiva" });
    }
  }
}
