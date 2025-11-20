/**
 * Archivo: src/models/Delivery.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 08/10/2025
 * Descripción: Modelo que representa las entregas asociadas a los contratos.
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Contract } from "./Contract";

export interface DeliveryI {
  id?: number;
  contract_id: number;
  delivery_date: Date;
  status: "PENDING" | "COMPLETED" | "RETURNED";
}

export class Delivery extends Model implements DeliveryI {
  public id!: number;
  public contract_id!: number;
  public delivery_date!: Date;
  public status!: "PENDING" | "COMPLETED" | "RETURNED";
}

Delivery.init(
  {
    contract_id: { type: DataTypes.INTEGER, allowNull: false },
    delivery_date: { type: DataTypes.DATE, allowNull: false },
    status: {
      type: DataTypes.ENUM("PENDING", "COMPLETED", "RETURNED"),
      defaultValue: "PENDING",
    },
  },
  {
    sequelize,
    modelName: "Delivery",
    tableName: "deliveries",
    timestamps: false,
  }
);

Contract.hasOne(Delivery, {
  foreignKey: "contract_id",
  sourceKey: "id",
});

Delivery.belongsTo(Contract, {
  foreignKey: "contract_id",
  targetKey: "id",
});
