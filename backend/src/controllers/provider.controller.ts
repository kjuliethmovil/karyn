/**
 * Archivo: src/controllers/provider.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Controlador para la gestión de los proveedores que suministran equipos al sistema Rentool.
 */

import { Request, Response } from "express";
import { Provider, ProviderI } from "../models/Provider";

export class ProviderController {
  // Obtener todos los proveedores activos
  public async getAllProviders(req: Request, res: Response) {
    try {
      const providers: ProviderI[] = await Provider.findAll({
        where: { status: "ACTIVE" },
      });
      res.status(200).json( providers );
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los proveedores" });
    }
  }

  // Obtener un proveedor por ID
  public async getProviderById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const provider = await Provider.findOne({
        where: { id, status: "ACTIVE" },
      });
      provider
        ? res.status(200).json( provider )
        : res.status(404).json({ error: "Proveedor no encontrado o inactivo" });
    } catch (error) {
      res.status(500).json({ error: "Error al buscar el proveedor" });
    }
  }

  // Crear un nuevo proveedor
  public async createProvider(req: Request, res: Response) {
    const { name, address, phone, email, contact_person, status } = req.body;
    try {
      const newProvider = await Provider.create({
        name,
        address,
        phone,
        email,
        contact_person,
        status,
      });
      res.status(201).json(newProvider);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar proveedor
  public async updateProvider(req: Request, res: Response) {
    const { id } = req.params;
    const { name, address, phone, email, contact_person, status } = req.body;
    try {
      const provider = await Provider.findByPk(id);
      if (!provider)
        return res.status(404).json({ error: "Proveedor no encontrado" });

      await provider.update({
        name,
        address,
        phone,
        email,
        contact_person,
        status,
      });
      res.status(200).json(provider);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminación física
  public async deleteProvider(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const provider = await Provider.findByPk(id);
      if (!provider)
        return res.status(404).json({ error: "Proveedor no encontrado" });

      await provider.destroy();
      res.status(200).json({ message: "Proveedor eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el proveedor" });
    }
  }

  // Eliminación lógica
  public async deleteProviderAdv(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const provider = await Provider.findOne({ where: { id, status: "ACTIVE" } });
      if (!provider)
        return res.status(404).json({ error: "Proveedor no encontrado" });

      await provider.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Proveedor marcado como inactivo" });
    } catch (error) {
      res.status(500).json({ error: "Error al marcar el proveedor como inactivo" });
    }
  }
}
