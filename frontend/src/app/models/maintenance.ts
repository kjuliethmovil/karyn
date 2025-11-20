/**
 * Archivo: maintenance.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Modelo para la entidad Maintenance
 */

export interface MaintenanceI {
  maintenance_id?: number;
  equipment_id: number;
  date: Date;
  description: string;
  cost: number;
  status: "ACTIVE" | "INACTIVE";
}

export interface MaintenanceResponseI {
  maintenance_id: number;
  equipment_id: number;
  date: Date;
  description: string;
  cost: number;
}
  
