/**
 * Archivo: src/models/Warranty.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Modelo que representa las garantías asociadas a los contratos de alquiler.
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Contract } from "./Contract";
import { Equipment } from "./Equipment";

export interface WarrantyI {
  id?: number;
  contract_id: number;
  equipment_id: number;
  issue_date: Date;
  expiration_date: Date;
  description: string;
  status: "ACTIVE" | "INACTIVE";
}

export class Warranty extends Model implements WarrantyI {
  public id!: number;
  public contract_id!: number;
  public equipment_id!: number;
  public issue_date!: Date;
  public expiration_date!: Date;
  public description!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Warranty.init(
  {
    contract_id: { type: DataTypes.INTEGER, allowNull: false },
    equipment_id: { type: DataTypes.INTEGER, allowNull: false },
    issue_date: { type: DataTypes.DATE, allowNull: false },
    expiration_date: { type: DataTypes.DATE, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  },
  {
    sequelize,
    modelName: "Warranty",
    tableName: "warranties",
    timestamps: false,
  }
);

// Relaciones
Warranty.belongsTo(Contract, { foreignKey: "contract_id", targetKey: "id" });
Warranty.belongsTo(Equipment, { foreignKey: "equipment_id", targetKey: "id" });
