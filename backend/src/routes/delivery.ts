// routes/delivery.routes.ts
import { Router, Application } from "express";
import { DeliveryController } from "../controllers/delivery.controller";
import { authMiddleware } from "../middleware/auth";


export class DeliveryRoutes {
  public deliveryController: DeliveryController = new DeliveryController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/deliveries/public")
      .get(this.deliveryController.getAllDeliveries)
      .post(this.deliveryController.createDelivery);

    app.route("/api/deliveries/public/:id")
      .get(this.deliveryController.getDeliveryById)
      .patch(this.deliveryController.updateDelivery)
      .delete(this.deliveryController.deleteDelivery);

    app.route("/api/deliveries/public/:id/logic")
      .delete(this.deliveryController.deleteDeliveryAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/deliveries")
      .get(authMiddleware, this.deliveryController.getAllDeliveries)
      .post(authMiddleware, this.deliveryController.createDelivery);

    app.route("/api/deliveries/:id")
      .get(authMiddleware, this.deliveryController.getDeliveryById)
      .patch(authMiddleware, this.deliveryController.updateDelivery)
      .delete(authMiddleware, this.deliveryController.deleteDelivery);

    app.route("/api/deliveries/:id/logic")
      .delete(authMiddleware, this.deliveryController.deleteDeliveryAdv);
  }
}
