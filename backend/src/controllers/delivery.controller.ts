/**
 * Archivo: src/controllers/delivery.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Controlador para la gestión de entregas de equipos en contratos de alquiler.
 */

import { Request, Response } from "express";
import { Delivery, DeliveryI } from "../models/Delivery";

export class DeliveryController {
  // Obtener todas las entregas activas
  public async getAllDeliveries(req: Request, res: Response) {
    try {
      const deliveries = await Delivery.findAll();
      res.status(200).json( deliveries );
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las entregas" });
    }
  }

  // Obtener entrega por ID
  public async getDeliveryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const delivery = await Delivery.findOne({
        where: { id, status: "ACTIVE" },
      });
      delivery
        ? res.status(200).json({ delivery })
        : res.status(404).json({ error: "Entrega no encontrada o inactiva" });
    } catch (error) {
      res.status(500).json({ error: "Error al buscar la entrega" });
    }
  }

  // Crear entrega
  public async createDelivery(req: Request, res: Response) {
    const { contract_id, date, condition, observations, status } = req.body;
    try {
      const newDelivery = await Delivery.create({
        contract_id,
        date,
        condition,
        observations,
        status,
      });
      res.status(201).json(newDelivery);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar entrega
  public async updateDelivery(req: Request, res: Response) {
    const { id } = req.params;
    const { contract_id, date, condition, observations, status } = req.body;
    try {
      const delivery = await Delivery.findByPk(id);
      if (!delivery)
        return res.status(404).json({ error: "Entrega no encontrada" });

      await delivery.update({ contract_id, date, condition, observations, status });
      res.status(200).json(delivery);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar físicamente
  public async deleteDelivery(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const delivery = await Delivery.findByPk(id);
      if (!delivery)
        return res.status(404).json({ error: "Entrega no encontrada" });

      await delivery.destroy();
      res.status(200).json({ message: "Entrega eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la entrega" });
    }
  }

  // Eliminación lógica
  public async deleteDeliveryAdv(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const delivery = await Delivery.findOne({ where: { id, status: "ACTIVE" } });
      if (!delivery)
        return res.status(404).json({ error: "Entrega no encontrada" });

      await delivery.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Entrega marcada como inactiva" });
    } catch (error) {
      res.status(500).json({ error: "Error al marcar la entrega como inactiva" });
    }
  }
}
