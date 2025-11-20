/**
 * Archivo: delivery.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Modelo para la entidad Delivery
 */

export interface DeliveryI {
  delivery_id?: number;
  contract_id: number;
  date: Date;
  address: string;
  status: "PENDING" | "DELIVERED" | "CANCELLED";
  notes: string;
}

export interface DeliveryResponseI {
  delivery_id: number;
  contract_id: number;
  date: Date;
  address: string;
  notes: string;
}
