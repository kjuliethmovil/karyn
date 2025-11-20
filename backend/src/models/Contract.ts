/**
 * Archivo: src/models/Contract.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Modelo que representa los contratos de alquiler firmados entre el cliente y Rentool.
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface ContractI {
  id?: number;
  start_date: Date;
  end_date: Date;
  total_days: number;
  total_amount: number;
  client_id: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Contract extends Model implements ContractI {
  public id!: number;
  public start_date!: Date;
  public end_date!: Date;
  public total_days!: number;
  public total_amount!: number;
  public client_id!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Contract.init(
  {
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Contract",
    tableName: "contracts",
    timestamps: false,
  }
);
