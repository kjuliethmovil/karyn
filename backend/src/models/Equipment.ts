/**
 * Archivo: src/models/Equipment.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Modelo que representa los equipos disponibles para alquiler.
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface EquipmentI {
  id?: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  category_id: number;
  provider_id: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Equipment extends Model implements EquipmentI {
  public id!: number;
  public name!: string;
  public brand!: string;
  public price!: number;
  public stock!: number;
  public category_id!: number;
  public provider_id!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Equipment.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    provider_id: {
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
    modelName: "Equipment",
    tableName: "equipments",
    timestamps: false,
  }
);
