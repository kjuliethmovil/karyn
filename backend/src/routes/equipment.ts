// routes/equipment.routes.ts
import { Router, Application } from "express";
import { EquipmentController } from "../controllers/equipment.controller";
import { authMiddleware } from "../middleware/auth";


export class EquipmentRoutes {
  public equipmentController: EquipmentController = new EquipmentController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/equipments/public")
      .get(this.equipmentController.getAllEquipments)
      .post(this.equipmentController.createEquipment);

    app.route("/api/equipments/public/:id")
      .get(this.equipmentController.getEquipmentById)
      .patch(this.equipmentController.updateEquipment)
      .delete(this.equipmentController.deleteEquipment);

    app.route("/api/equipments/public/:id/logic")
      .delete(this.equipmentController.deleteEquipmentAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/equipments")
      .get(authMiddleware, this.equipmentController.getAllEquipments)
      .post(authMiddleware, this.equipmentController.createEquipment);

    app.route("/api/equipments/:id")
      .get(authMiddleware, this.equipmentController.getEquipmentById)
      .patch(authMiddleware, this.equipmentController.updateEquipment)
      .delete(authMiddleware, this.equipmentController.deleteEquipment);

    app.route("/api/equipments/:id/logic")
      .delete(authMiddleware, this.equipmentController.deleteEquipmentAdv);
  }
}
