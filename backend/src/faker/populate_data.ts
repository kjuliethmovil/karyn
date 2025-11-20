/**
 * Script de población de datos de ejemplo para Rentool.
 * Ejecutar con: npm run populate
 */
import dotenv from "dotenv";
import { Transaction } from "sequelize";
import { sequelize } from "../database/db";
import { Category } from "../models/Category";
import { Client } from "../models/Client";
import { Contract } from "../models/Contract";
import { ContractDetail } from "../models/ContractDetail";
import { Delivery } from "../models/Delivery";
import { Equipment } from "../models/Equipment";
import { Maintenance } from "../models/Maintenance";
import { Payment } from "../models/Payment";
import { Provider } from "../models/Provider";
import { Returns } from "../models/Returns";
import { Warranty } from "../models/Warranty";
import { RefreshToken } from "../models/authorization/RefreshToken";
import { Resource } from "../models/authorization/Resource";
import { ResourceRole } from "../models/authorization/ResourceRole";
import { Role } from "../models/authorization/Role";
import { RoleUser } from "../models/authorization/RoleUser";
import { User } from "../models/authorization/User";

dotenv.config();

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomFloat = (min: number, max: number, decimals = 2) => {
  const value = Math.random() * (max - min) + min;
  return parseFloat(value.toFixed(decimals));
};

const sample = <T>(list: T[]): T => list[randomInt(0, list.length - 1)];

async function seedAuthorization(transaction: Transaction) {
  const roles = await Role.bulkCreate(
    [
      { name: "ADMIN", is_active: "ACTIVE" },
      { name: "OPERATIONS", is_active: "ACTIVE" },
    ],
    { transaction }
  );

  const users = await User.bulkCreate(
    [
      {
        username: "admin",
        email: "admin@rentool.com",
        password: "Admin123!",
        is_active: "ACTIVE",
      },
      {
        username: "operador",
        email: "ops@rentool.com",
        password: "Ops123!",
        is_active: "ACTIVE",
      },
    ],
    { transaction, individualHooks: true }
  );

  await RoleUser.bulkCreate(
    [
      { role_id: roles[0].id, user_id: users[0].id, is_active: "ACTIVE" },
      { role_id: roles[1].id, user_id: users[1].id, is_active: "ACTIVE" },
    ],
    { transaction }
  );

  const resources = await Resource.bulkCreate(
    [
      { path: "/api/clients", method: "GET", is_active: "ACTIVE" },
      { path: "/api/equipments", method: "GET", is_active: "ACTIVE" },
      { path: "/api/contracts", method: "POST", is_active: "ACTIVE" },
    ],
    { transaction }
  );

  await ResourceRole.bulkCreate(
    resources.map((resource) => ({
      resource_id: resource.id,
      role_id: roles[0].id,
      is_active: "ACTIVE",
    })),
    { transaction }
  );

  await RefreshToken.bulkCreate(
    users.map((user) => ({
      user_id: user.id,
      token: `seed-token-${user.id}`,
      device_info: "seed-script",
      is_valid: "ACTIVE",
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
      created_at: new Date(),
      updated_at: new Date(),
    })),
    { transaction }
  );
}

async function seedCoreData(transaction: Transaction) {
  const providers = await Provider.bulkCreate(
    [
      {
        name: "Proveedora Andina",
        address: "Av. Central 123",
        phone: "999-111-222",
        email: "contacto@andina.com",
        contact_person: "Lucía Pérez",
        status: "ACTIVE",
      },
      {
        name: "Suministros del Norte",
        address: "Calle 45 #67",
        phone: "888-222-333",
        email: "ventas@norte.com",
        contact_person: "Jorge Ramírez",
        status: "ACTIVE",
      },
      {
        name: "Equipos Express",
        address: "Pasaje Sur 56",
        phone: "777-333-444",
        email: "info@expres.com",
        contact_person: "Ana Torres",
        status: "ACTIVE",
      },
    ],
    { transaction }
  );

  const categories = await Category.bulkCreate(
    [
      { name: "Excavación", description: "Equipos de movimiento de tierra", status: "ACTIVE" },
      { name: "Carga", description: "Grúas, montacargas y similares", status: "ACTIVE" },
      { name: "Compactación", description: "Rodillos y compactadoras", status: "ACTIVE" },
      { name: "Corte", description: "Cortadoras y sierras industriales", status: "ACTIVE" },
    ],
    { transaction }
  );

  const equipments = await Equipment.bulkCreate(
    [
      {
        name: "Excavadora ZX200",
        brand: "Hitachi",
        price: 850,
        stock: 5,
        category_id: categories[0].id!,
        provider_id: providers[0].id!,
        status: "ACTIVE",
      },
      {
        name: "Retroexcavadora 3CX",
        brand: "JCB",
        price: 620,
        stock: 4,
        category_id: categories[0].id!,
        provider_id: providers[1].id!,
        status: "ACTIVE",
      },
      {
        name: "Montacargas FG25",
        brand: "Toyota",
        price: 410,
        stock: 6,
        category_id: categories[1].id!,
        provider_id: providers[1].id!,
        status: "ACTIVE",
      },
      {
        name: "Grúa RT700",
        brand: "Terex",
        price: 1200,
        stock: 2,
        category_id: categories[1].id!,
        provider_id: providers[2].id!,
        status: "ACTIVE",
      },
      {
        name: "Rodillo Vibratorio HD12",
        brand: "Hamm",
        price: 350,
        stock: 7,
        category_id: categories[2].id!,
        provider_id: providers[0].id!,
        status: "ACTIVE",
      },
      {
        name: "Compactadora LT600",
        brand: "Atlas Copco",
        price: 180,
        stock: 10,
        category_id: categories[2].id!,
        provider_id: providers[2].id!,
        status: "ACTIVE",
      },
      {
        name: "Cortadora CS 451",
        brand: "Husqvarna",
        price: 150,
        stock: 12,
        category_id: categories[3].id!,
        provider_id: providers[0].id!,
        status: "ACTIVE",
      },
    ],
    { transaction }
  );

  const clients = await Client.bulkCreate(
    Array.from({ length: 8 }).map((_, index) => ({
      name: `Cliente ${index + 1}`,
      address: `Calle Falsa ${100 + index}`,
      phone: `900-555-0${index}${index}`,
      email: `cliente${index + 1}@correo.com`,
      password: `Pass${index + 1}23`,
      status: "ACTIVE" as const,
    })),
    { transaction }
  );

  const contracts: Contract[] = [];
  for (let i = 0; i < 6; i++) {
    const start = new Date();
    start.setDate(start.getDate() - randomInt(5, 20));
    const days = randomInt(3, 12);
    const end = new Date(start);
    end.setDate(start.getDate() + days);

    const contract = await Contract.create(
      {
        start_date: start,
        end_date: end,
        total_days: days,
        total_amount: 0,
        client_id: clients[i].id!,
        status: "ACTIVE",
      },
      { transaction }
    );
    contracts.push(contract);
  }

  for (const contract of contracts) {
    const detailCount = randomInt(1, 3);
    let contractTotal = 0;

    for (let i = 0; i < detailCount; i++) {
      const equipment = sample(equipments);
      const days = randomInt(1, 7);
      const rate = randomFloat(equipment.price * 0.6, equipment.price * 1.2);

      await ContractDetail.create(
        {
          contract_id: contract.id!,
          equipment_id: equipment.id!,
          days,
          rate,
          status: "ACTIVE",
        },
        { transaction }
      );

      contractTotal += days * rate;

      await Maintenance.create(
        {
          equipment_id: equipment.id!,
          date: new Date(),
          description: `Revisión preventiva #${randomInt(100, 999)}`,
          cost: randomFloat(40, 140),
          status: "ACTIVE",
        },
        { transaction }
      );

      await Warranty.create(
        {
          contract_id: contract.id!,
          equipment_id: equipment.id!,
          issue_date: new Date(),
          expiration_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          description: "Cobertura de fallos operativos",
          status: "ACTIVE",
        },
        { transaction }
      );
    }

    await contract.update({ total_amount: contractTotal }, { transaction });

    await Delivery.create(
      {
        contract_id: contract.id!,
        delivery_date: new Date(contract.start_date),
        status: sample(["PENDING", "COMPLETED", "RETURNED"] as const),
      },
      { transaction }
    );

    await Payment.bulkCreate(
      [
        {
          contract_id: contract.id!,
          payment_date: new Date(contract.start_date),
          amount: parseFloat((contractTotal * 0.4).toFixed(2)),
          method: sample(["CASH", "CARD", "TRANSFER"] as const),
          status: "PAID",
          reference: `PAY-${contract.id}-1`,
        },
        {
          contract_id: contract.id!,
          payment_date: new Date(contract.end_date),
          amount: parseFloat((contractTotal * 0.6).toFixed(2)),
          method: sample(["CASH", "CARD", "TRANSFER"] as const),
          status: "PENDING",
          reference: `PAY-${contract.id}-2`,
        },
      ],
      { transaction }
    );

    if (Math.random() > 0.5) {
      await Returns.create(
        {
          contract_id: contract.id!,
          return_date: new Date(contract.end_date),
          damage_report: Math.random() > 0.7 ? "Golpe en cubierta lateral" : undefined,
          status: "ACTIVE",
        },
        { transaction }
      );
    }
  }
}

async function populate() {
  console.log("⏳ Limpiando y sincronizando base de datos...");
  await sequelize.sync({ force: true });

  const transaction = await sequelize.transaction();
  try {
    await seedAuthorization(transaction);
    await seedCoreData(transaction);
    await transaction.commit();
    console.log("✅ Datos de ejemplo insertados correctamente.");
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error al poblar datos:", error);
  } finally {
    await sequelize.close();
  }
}

populate();
