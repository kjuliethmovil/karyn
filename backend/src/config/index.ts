import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import { sequelize, testConnection, getDatabaseInfo } from "../database/db";
import { Routes } from "../routes/index";

var cors = require("cors");

dotenv.config();

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.dbConnection();
  }

  private settings(): void {
    this.app.set('port', this.port || process.env.PORT || 4000);
  }

  private middlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  // ==============================
  // CONFIGURACIÓN DE RUTAS
  // ==============================
  private routes(): void {
    //--- ENTIDADES RENTOOL2 ---
    this.routePrv.clientRoutes.routes(this.app);
    this.routePrv.categoryRoutes.routes(this.app);
    this.routePrv.contractDetailRoutes.routes(this.app);
    this.routePrv.contractRoutes.routes(this.app);
    this.routePrv.deliveryRoutes.routes(this.app);
    this.routePrv.equipmentRoutes.routes(this.app);
    this.routePrv.maintenanceRoutes.routes(this.app);
    this.routePrv.paymentRoutes.routes(this.app);
    this.routePrv.providerRoutes.routes(this.app);
    this.routePrv.returnsRoutes.routes(this.app);
    this.routePrv.warrantyRoutes.routes(this.app);

    // --- AUTORIZACIÓN Y SEGURIDAD ---
    this.routePrv.userRoutes.routes(this.app);
    this.routePrv.authRoutes.routes(this.app);
    this.routePrv.roleRoutes.routes(this.app);
    this.routePrv.roleUserRoutes.routes(this.app);
    this.routePrv.resourceRoutes.routes(this.app);
    this.routePrv.resourceRoleRoutes.routes(this.app);
    this.routePrv.refreshTokenRoutes.routes(this.app);
  }

 private async dbConnection(): Promise<void> {
    try {
      // Mostrar información de la base de datos seleccionada
      const dbInfo = getDatabaseInfo();
      console.log(`🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()}`);

      // Probar la conexión
      const isConnected = await testConnection();

      if (!isConnected) {
        throw new Error(`No se pudo conectar a la base de datos ${dbInfo.engine.toUpperCase()}`);
      }

      // Sincronizar la base de datos
      await sequelize.sync({ force: false });
      console.log(`📦 Base de datos sincronizada exitosamente`);

    } catch (error) {
      console.error("❌ Error al conectar con la base de datos:", error);
      process.exit(1); // Terminar la aplicación si no se puede conectar
    }
  }

  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log(`🚀 Servidor ejecutándose en puerto ${this.app.get('port')}`);
  }
}