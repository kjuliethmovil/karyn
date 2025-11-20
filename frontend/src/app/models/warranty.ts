/**
 * Archivo: warranty.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Modelo para la entidad Warranty
 */

export interface WarrantyI {
  warranty_id?: number;
  contract_id: number;
  description: string;
  amount: number;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED";
}

export interface WarrantyResponseI {
  warranty_id: number;
  contract_id: number;
  description: string;
  amount: number;
}