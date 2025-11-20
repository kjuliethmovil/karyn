/**
 * Archivo: returns.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Modelo para la entidad Returns
 */

export interface ReturnsI {
  return_id?: number;
  contract_id: number;
  date: Date;
  item_condition: string;
  notes: string;
}

export interface ReturnsResponseI {
  return_id: number;
  contract_id: number;
  date: Date;
  item_condition: string;
  notes: string;
}
