// routes/maintenance.routes.ts
import { Router, Application } from "express";
import { MaintenanceController } from "../controllers/maintenance.controller";
import { authMiddleware } from "../middleware/auth";


export class MaintenanceRoutes {
  public maintenanceController: MaintenanceController = new MaintenanceController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/maintenances/public")
      .get(this.maintenanceController.getAllMaintenances)
      .post(this.maintenanceController.createMaintenance);

    app.route("/api/maintenances/public/:id")
      .get(this.maintenanceController.getMaintenanceById)
      .patch(this.maintenanceController.updateMaintenance)
      .delete(this.maintenanceController.deleteMaintenance);

    app.route("/api/maintenances/public/:id/logic")
      .delete(this.maintenanceController.deleteMaintenanceAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/maintenances")
      .get(authMiddleware, this.maintenanceController.getAllMaintenances)
      .post(authMiddleware, this.maintenanceController.createMaintenance);

    app.route("/api/maintenances/:id")
      .get(authMiddleware, this.maintenanceController.getMaintenanceById)
      .patch(authMiddleware, this.maintenanceController.updateMaintenance)
      .delete(authMiddleware, this.maintenanceController.deleteMaintenance);

    app.route("/api/maintenances/:id/logic")
      .delete(authMiddleware, this.maintenanceController.deleteMaintenanceAdv);
  }
}
