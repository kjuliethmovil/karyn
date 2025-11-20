// routes/warranty.routes.ts
import { Router, Application } from "express";
import { WarrantyController } from "../controllers/warranty.controller";
import { authMiddleware } from "../middleware/auth";


export class WarrantyRoutes {
  public warrantyController: WarrantyController = new WarrantyController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/warranties/public")
      .get(this.warrantyController.getAllWarranties)
      .post(this.warrantyController.createWarranty);

    app.route("/api/warranties/public/:id")
      .get(this.warrantyController.getWarrantyById)
      .patch(this.warrantyController.updateWarranty)
      .delete(this.warrantyController.deleteWarranty);

    app.route("/api/warranties/public/:id/logic")
      .delete(this.warrantyController.deleteWarrantyAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/warranties")
      .get(authMiddleware, this.warrantyController.getAllWarranties)
      .post(authMiddleware, this.warrantyController.createWarranty);

    app.route("/api/warranties/:id")
      .get(authMiddleware, this.warrantyController.getWarrantyById)
      .patch(authMiddleware, this.warrantyController.updateWarranty)
      .delete(authMiddleware, this.warrantyController.deleteWarranty);

    app.route("/api/warranties/:id/logic")
      .delete(authMiddleware, this.warrantyController.deleteWarrantyAdv);
  }
}
