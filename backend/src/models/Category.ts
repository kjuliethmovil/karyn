/**
 * Archivo: src/models/Category.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Modelo que representa las categorías de los equipos.
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Equipment } from "./Equipment";

export interface CategoryI {
  id?: number;
  name: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
}

export class Category extends Model implements CategoryI {
  public id!: number;
  public name!: string;
  public description!: string;
  public status!: "ACTIVE" | "INACTIVE";
}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
    timestamps: false,
  }
);

// Relación: una categoría tiene muchos equipos
Category.hasMany(Equipment, {
  foreignKey: "category_id",
  sourceKey: "id",
});

Equipment.belongsTo(Category, {
  foreignKey: "category_id",
  targetKey: "id",
});
