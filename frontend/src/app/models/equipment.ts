/**
 * Archivo: equipment.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Modelo para la entidad Equipment
 */

export interface EquipmentI {
  equipment_id?: number;
  category_id: number;
  provider_id: number;
  name: string;
  description: string;
  status: "AVAILABLE" | "UNAVAILABLE" | "MAINTENANCE";
  daily_rate: number;
}

export interface EquipmentResponseI {
  equipment_id: number;
  category_id: number;
  provider_id: number;
  name: string;
  description: string;
  daily_rate: number;
}

