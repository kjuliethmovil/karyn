/**
 * Archivo: src/controllers/contract_detail.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Controlador para gestionar los detalles de los contratos (equipos alquilados, tarifas, días).
 */

import { Request, Response } from "express";
import { ContractDetail, ContractDetailI } from "../models/ContractDetail";

export class ContractDetailController {
  // Obtener todos los detalles activos
  public async getAllContractDetails(req: Request, res: Response) {
    try {
      const details = await ContractDetail.findAll();
      res.status(200).json( details );
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los detalles del contrato" });
    }
  }

  // Obtener detalle por ID
  public async getContractDetailById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const detail = await ContractDetail.findOne({
        where: { id, status: "ACTIVE" },
      });
      detail
        ? res.status(200).json({ detail })
        : res.status(404).json({ error: "Detalle no encontrado o inactivo" });
    } catch (error) {
      res.status(500).json({ error: "Error al buscar el detalle" });
    }
  }

  // Crear detalle
  public async createContractDetail(req: Request, res: Response) {
    const { contract_id, equipment_id, days, rate, subtotal, status } = req.body;
    try {
      const newDetail = await ContractDetail.create({
        contract_id,
        equipment_id,
        days,
        rate,
        subtotal,
        status,
      });
      res.status(201).json(newDetail);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar detalle
  public async updateContractDetail(req: Request, res: Response) {
    const { id } = req.params;
    const { contract_id, equipment_id, days, rate, subtotal, status } = req.body;
    try {
      const detail = await ContractDetail.findByPk(id);
      if (!detail)
        return res.status(404).json({ error: "Detalle no encontrado" });

      await detail.update({
        contract_id,
        equipment_id,
        days,
        rate,
        subtotal,
        status,
      });
      res.status(200).json(detail);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminación física
  public async deleteContractDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const detail = await ContractDetail.findByPk(id);
      if (!detail)
        return res.status(404).json({ error: "Detalle no encontrado" });

      await detail.destroy();
      res.status(200).json({ message: "Detalle eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el detalle" });
    }
  }

  // Eliminación lógica
  public async deleteContractDetailAdv(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const detail = await ContractDetail.findOne({ where: { id, status: "ACTIVE" } });
      if (!detail)
        return res.status(404).json({ error: "Detalle no encontrado" });

      await detail.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Detalle marcado como inactivo" });
    } catch (error) {
      res.status(500).json({ error: "Error al marcar el detalle como inactivo" });
    }
  }
}
