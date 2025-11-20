/**
 * Archivo: src/controllers/client.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Controlador para la gestión de clientes registrados en Rentool.
 */

import { Request, Response } from "express";
import { Client, ClientI } from "../models/Client";

export class ClientController {
  // Obtener todos los clientes activos
  public async getAllClients(req: Request, res: Response) {
    try {
      const clients: ClientI[] = await Client.findAll({
        where: { status: 'ACTIVE' },
      });
      res.status(200).json(clients );
    } catch (error) {
      res.status(500).json({ error: "Error fetching clients" });
    }
  }

  // Obtener cliente por ID
  public async getClientById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await Client.findOne({ where: { id, status: "ACTIVE" } });
      client
        ? res.status(200).json( client )
        : res.status(404).json({ error: "Cliente no encontrado o inactivo" });
    } catch (error) {
      res.status(500).json({ error: "Error al buscar el cliente" });
    }
  }

  // Crear nuevo cliente
  public async createClient(req: Request, res: Response) {
    const { name, address, phone, email, password, status } = req.body;
    try {
      const newClient = await Client.create({
        name,
        address,
        phone,
        email,
        password,
        status,
      });
      res.status(201).json(newClient);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar cliente
  public async updateClient(req: Request, res: Response) {
    const { id } = req.params;
    const { name, address, phone, email, password, status } = req.body;
    try {
      const client = await Client.findByPk(id);
      if (!client)
        return res.status(404).json({ error: "Cliente no encontrado" });

      await client.update({
        name,
        address,
        phone,
        email,
        password,
        status,
      });
      res.status(200).json(client);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar físicamente
  public async deleteClient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await Client.findByPk(id);
      if (!client)
        return res.status(404).json({ error: "Cliente no encontrado" });

      await client.destroy();
      res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el cliente" });
    }
  }

  // Eliminación lógica
  public async deleteClientAdv(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await Client.findOne({ where: { id, status: "ACTIVE" } });
      if (!client)
        return res.status(404).json({ error: "Cliente no encontrado" });

      await client.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Cliente marcado como inactivo" });
    } catch (error) {
      res.status(500).json({ error: "Error al marcar el cliente como inactivo" });
    }
  }
}
