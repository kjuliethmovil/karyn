/**
 * Archivo: payment.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Modelo para la entidad Payment
 */

export interface PaymentI {
  payment_id?: number;
  contract_id: number;
  payment_date: Date;
  amount: number;
  method: "CASH" | "CARD" | "TRANSFER";
  status: "PENDING" | "PAID" | "FAILED";
  reference: string;
}

export interface PaymentResponseI {
  payment_id: number;
  contract_id: number;
  payment_date: Date;
  amount: number;
  reference: string;
}
