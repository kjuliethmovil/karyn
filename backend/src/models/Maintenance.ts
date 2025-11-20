/**
 * Archivo: src/models/Maintenance.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 08/10/2025
 * Descripción: Modelo que gestiona los mantenimientos realizados a los equipos.
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Equipment } from "./Equipment";

export interface MaintenanceI {
  id?: number;
  equipment_id: number;
  date: Date;
  description: string;
  cost: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Maintenance extends Model implements MaintenanceI {
  public id!: number;
  public equipment_id!: number;
  public date!: Date;
  public description!: string;
  public cost!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Maintenance.init(
  {
    equipment_id: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    cost: { type: DataTypes.FLOAT, allowNull: false },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Maintenance",
    tableName: "maintenances",
    timestamps: false,
  }
);

Equipment.hasMany(Maintenance, {
  foreignKey: "equipment_id",
  sourceKey: "id",
});

Maintenance.belongsTo(Equipment, {
  foreignKey: "equipment_id",
  targetKey: "id",
});
