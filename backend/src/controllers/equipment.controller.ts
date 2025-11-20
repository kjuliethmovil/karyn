/**
 * Archivo: src/controllers/equipment.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Controlador para gestionar los equipos disponibles para alquiler dentro de Rentool.
 */

import { Request, Response } from "express";
import { Equipment, EquipmentI } from "../models/Equipment";

export class EquipmentController {
  // Obtener todos los equipos activos
  public async getAllEquipments(req: Request, res: Response) {
    try {
      const equipments: EquipmentI[] = await Equipment.findAll({
        where: { status: "ACTIVE" },
      });
      res.status(200).json( equipments );
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los equipos" });
    }
  }

  // Obtener un equipo por ID
  public async getEquipmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const equipment = await Equipment.findOne({
        where: { id, status: "ACTIVE" },
      });
      equipment
        ? res.status(200).json({ equipment })
        : res.status(404).json({ error: "Equipo no encontrado o inactivo" });
    } catch (error) {
      res.status(500).json({ error: "Error al buscar el equipo" });
    }
  }

  // Crear un nuevo equipo
  public async createEquipment(req: Request, res: Response) {
    const { name, brand, category_id, provider_id, price, stock, status } = req.body;
    try {
      const newEquipment = await Equipment.create({
        name,
        brand,
        category_id,
        provider_id,
        price,
        stock,
        status,
      });
      res.status(201).json(newEquipment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar equipo
  public async updateEquipment(req: Request, res: Response) {
    const { id } = req.params;
    const { name, brand, category_id, provider_id, price, stock, status } = req.body;
    try {
      const equipment = await Equipment.findByPk(id);
      if (!equipment)
        return res.status(404).json({ error: "Equipo no encontrado" });

      await equipment.update({
        name,
        brand,
        category_id,
        provider_id,
        price,
        stock,
        status,
      });
      res.status(200).json(equipment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminación física
  public async deleteEquipment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const equipment = await Equipment.findByPk(id);
      if (!equipment)
        return res.status(404).json({ error: "Equipo no encontrado" });

      await equipment.destroy();
      res.status(200).json({ message: "Equipo eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el equipo" });
    }
  }

  // Eliminación lógica
  public async deleteEquipmentAdv(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const equipment = await Equipment.findOne({ where: { id, status: "ACTIVE" } });
      if (!equipment)
        return res.status(404).json({ error: "Equipo no encontrado" });

      await equipment.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Equipo marcado como inactivo" });
    } catch (error) {
      res.status(500).json({ error: "Error al marcar el equipo como inactivo" });
    }
  }
}
