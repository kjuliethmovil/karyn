/**
 * Archivo: src/controllers/payment.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Controlador para la gestión de pagos de los contratos de alquiler en Rentool.
 */

import { Request, Response } from "express";
import { Payment, PaymentI } from "../models/Payment";

export class PaymentController {
  // Obtener todos los pagos activos
  public async getAllPayments(req: Request, res: Response) {
    try {
      const payments = await Payment.findAll();
      res.status(200).json( payments );
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los pagos" });
    }
  }

  // Obtener pago por ID
  public async getPaymentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ where: { id, status: "ACTIVE" } });
      payment
        ? res.status(200).json({ payment })
        : res.status(404).json({ error: "Pago no encontrado o inactivo" });
    } catch (error) {
      res.status(500).json({ error: "Error al buscar el pago" });
    }
  }

  // Crear pago
  public async createPayment(req: Request, res: Response) {
    const { contract_id, payment_date, amount, method, status, reference } = req.body;
    try {
      const newPayment = await Payment.create({
        contract_id,
        payment_date,
        amount,
        method,
        status,
        reference,
      });
      res.status(201).json(newPayment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar pago
  public async updatePayment(req: Request, res: Response) {
    const { id } = req.params;
    const { contract_id, payment_date, amount, method, status, reference } = req.body;
    try {
      const payment = await Payment.findByPk(id);
      if (!payment)
        return res.status(404).json({ error: "Pago no encontrado" });

      await payment.update({
        contract_id,
        payment_date,
        amount,
        method,
        status,
        reference,
      });
      res.status(200).json(payment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar físicamente
  public async deletePayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payment = await Payment.findByPk(id);
      if (!payment)
        return res.status(404).json({ error: "Pago no encontrado" });

      await payment.destroy();
      res.status(200).json({ message: "Pago eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el pago" });
    }
  }

  // Eliminación lógica
  public async deletePaymentAdv(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ where: { id, status: "ACTIVE" } });
      if (!payment)
        return res.status(404).json({ error: "Pago no encontrado" });

      await payment.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Pago marcado como inactivo" });
    } catch (error) {
      res.status(500).json({ error: "Error al marcar el pago como inactivo" });
    }
  }
}
