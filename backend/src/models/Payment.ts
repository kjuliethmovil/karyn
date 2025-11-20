/**
 * Archivo: src/models/Payment.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 08/10/2025
 * Descripción: Modelo que representa los pagos realizados por contrato.
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Contract } from "./Contract";

export interface PaymentI {
  id?: number;
  contract_id: number;
  payment_date: Date;
  amount: number;
  method: "CASH" | "CARD" | "TRANSFER";
  status: "PENDING" | "PAID" | "FAILED";
  reference?: string;
}

export class Payment extends Model implements PaymentI {
  public id!: number;
  public contract_id!: number;
  public payment_date!: Date;
  public amount!: number;
  public method!: "CASH" | "CARD" | "TRANSFER";
  public status!: "PENDING" | "PAID" | "FAILED";
  public reference?: string;
}

Payment.init(
  {
    contract_id: { type: DataTypes.INTEGER, allowNull: false },
    payment_date: { type: DataTypes.DATE, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    method: {
      type: DataTypes.ENUM("CASH", "CARD", "TRANSFER"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "PAID", "FAILED"),
      defaultValue: "PENDING",
    },
    reference: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: false,
  }
);

Contract.hasMany(Payment, {
  foreignKey: "contract_id",
  sourceKey: "id",
});

Payment.belongsTo(Contract, {
  foreignKey: "contract_id",
  targetKey: "id",
});
