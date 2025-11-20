/**
 * Archivo: src/controllers/maintenance.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Controlador para la gestión del mantenimiento de equipos dentro de Rentool.
 */

import { Request, Response } from "express";
import { Maintenance, MaintenanceI } from "../models/Maintenance";

export class MaintenanceController {
  // Obtener todos los mantenimientos activos
  public async getAllMaintenances(req: Request, res: Response) {
    try {
      const maintenances = await Maintenance.findAll();
      res.status(200).json( maintenances );
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los mantenimientos" });
    }
  }

  // Obtener mantenimiento por ID
  public async getMaintenanceById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const maintenance = await Maintenance.findOne({ where: { id, status: "ACTIVE" } });
      maintenance
        ? res.status(200).json({ maintenance })
        : res.status(404).json({ error: "Mantenimiento no encontrado o inactivo" });
    } catch (error) {
      res.status(500).json({ error: "Error al buscar el mantenimiento" });
    }
  }

  // Crear mantenimiento
  public async createMaintenance(req: Request, res: Response) {
    const { equipment_id, date, description, cost, status } = req.body;
    try {
      const newMaintenance = await Maintenance.create({
        equipment_id,
        date,
        description,
        cost,
        status,
      });
      res.status(201).json(newMaintenance);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar mantenimiento
  public async updateMaintenance(req: Request, res: Response) {
    const { id } = req.params;
    const { equipment_id, date, description, cost, status } = req.body;
    try {
      const maintenance = await Maintenance.findByPk(id);
      if (!maintenance)
        return res.status(404).json({ error: "Mantenimiento no encontrado" });

      await maintenance.update({
        equipment_id,
        date,
        description,
        cost,
        status,
      });
      res.status(200).json(maintenance);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminación física
  public async deleteMaintenance(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const maintenance = await Maintenance.findByPk(id);
      if (!maintenance)
        return res.status(404).json({ error: "Mantenimiento no encontrado" });

      await maintenance.destroy();
      res.status(200).json({ message: "Mantenimiento eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el mantenimiento" });
    }
  }

  // Eliminación lógica
  public async deleteMaintenanceAdv(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const maintenance = await Maintenance.findOne({ where: { id, status: "ACTIVE" } });
      if (!maintenance)
        return res.status(404).json({ error: "Mantenimiento no encontrado" });

      await maintenance.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Mantenimiento marcado como inactivo" });
    } catch (error) {
      res.status(500).json({ error: "Error al marcar el mantenimiento como inactivo" });
    }
  }
}
