/**
 * Archivo: src/models/Provider.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Modelo que representa los proveedores de equipos.
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Equipment } from "./Equipment";

export interface ProviderI {
  id?: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  contact_person: string;
  status: "ACTIVE" | "INACTIVE";
}

export class Provider extends Model implements ProviderI {
  public id!: number;
  public name!: string;
  public address!: string;
  public phone!: string;
  public email!: string;
  public contact_person!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Provider.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contact_person: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Provider",
    tableName: "providers",
    timestamps: false,
  }
);

// Relación: un proveedor tiene muchos equipos
Provider.hasMany(Equipment, {
  foreignKey: "provider_id",
  sourceKey: "id",
});

Equipment.belongsTo(Provider, {
  foreignKey: "provider_id",
  targetKey: "id",
});
