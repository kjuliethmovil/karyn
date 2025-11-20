/**
 * Archivo: src/controllers/contract.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Controlador para la gestión de contratos de alquiler entre clientes y Rentool.
 */

import { Request, Response } from "express";
import { Contract, ContractI } from "../models/Contract";

export class ContractController {
  // Obtener todos los contratos activos
  public async getAllContracts(req: Request, res: Response) {
    try {
      const contracts: ContractI[] = await Contract.findAll({
        where: { status: "ACTIVE" },
      });
      res.status(200).json( contracts );
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los contratos" });
    }
  }

  // Obtener contrato por ID
  public async getContractById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contract = await Contract.findOne({
        where: { id, status: "ACTIVE" },
      });
      contract
        ? res.status(200).json({ contract })
        : res.status(404).json({ error: "Contrato no encontrado o inactivo" });
    } catch (error) {
      res.status(500).json({ error: "Error al buscar el contrato" });
    }
  }

  // Crear contrato
  public async createContract(req: Request, res: Response) {
    const { start_date, end_date, total_days, total_amount, client_id, status } = req.body;
    try {
      const newContract = await Contract.create({
        start_date,
        end_date,
        total_days,
        total_amount,
        client_id,
        status,
      });
      res.status(201).json(newContract);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar contrato
  public async updateContract(req: Request, res: Response) {
    const { id } = req.params;
    const { start_date, end_date, total_days, total_amount, client_id, status } = req.body;
    try {
      const contract = await Contract.findByPk(id);
      if (!contract)
        return res.status(404).json({ error: "Contrato no encontrado" });

      await contract.update({
        start_date,
        end_date,
        total_days,
        total_amount,
        client_id,
        status,
      });
      res.status(200).json(contract);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminación física
  public async deleteContract(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contract = await Contract.findByPk(id);
      if (!contract)
        return res.status(404).json({ error: "Contrato no encontrado" });

      await contract.destroy();
      res.status(200).json({ message: "Contrato eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el contrato" });
    }
  }

  // Eliminación lógica
  public async deleteContractAdv(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contract = await Contract.findOne({ where: { id, status: "ACTIVE" } });
      if (!contract)
        return res.status(404).json({ error: "Contrato no encontrado" });

      await contract.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Contrato marcado como inactivo" });
    } catch (error) {
      res.status(500).json({ error: "Error al marcar el contrato como inactivo" });
    }
  }
}
