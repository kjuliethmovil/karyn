/**
 * Archivo: contract.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Modelo para la entidad Contract
 */

export interface ContractI {
  contract_id?: number;
  client_id: number;
  start_date: Date;
  end_date: Date;
  total_amount: number;
  status: "ACTIVE" | "CLOSED" | "CANCELLED";
}

export interface ContractResponseI {
  contract_id: number;
  client_id: number;
  start_date: Date;
  end_date: Date;
  total_amount: number;
}
