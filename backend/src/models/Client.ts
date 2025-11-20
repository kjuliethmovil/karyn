/**
 * Archivo: src/models/Client.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Modelo que representa los clientes registrados en el sistema Rentool.
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Contract } from "./Contract";

export interface ClientI {
  id?: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  status: "ACTIVE" | "INACTIVE";
}

export class Client extends Model implements ClientI {
  public id!: number;
  public name!: string;
  public address!: string;
  public phone!: string;
  public email!: string;
  public password!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Client.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Client",
    tableName: "clients",
    timestamps: false,
  }
);

// Relación: un cliente tiene muchos contratos
Client.hasMany(Contract, {
  foreignKey: "client_id",
  sourceKey: "id",
});

Contract.belongsTo(Client, {
  foreignKey: "client_id",
  targetKey: "id",
});
