// routes/provider.routes.ts
import { Router, Application } from "express";
import { ProviderController } from "../controllers/provider.controller";
import { authMiddleware } from "../middleware/auth";


export class ProviderRoutes {
  public providerController: ProviderController = new ProviderController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/providers/public")
      .get(this.providerController.getAllProviders)
      .post(this.providerController.createProvider);

    app.route("/api/providers/public/:id")
      .get(this.providerController.getProviderById)
      .patch(this.providerController.updateProvider)
      .delete(this.providerController.deleteProvider);

    app.route("/api/providers/public/:id/logic")
      .delete(this.providerController.deleteProviderAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/providers")
      .get(authMiddleware, this.providerController.getAllProviders)
      .post(authMiddleware, this.providerController.createProvider);

    app.route("/api/providers/:id")
      .get(authMiddleware, this.providerController.getProviderById)
      .patch(authMiddleware, this.providerController.updateProvider)
      .delete(authMiddleware, this.providerController.deleteProvider);

    app.route("/api/providers/:id/logic")
      .delete(authMiddleware, this.providerController.deleteProviderAdv);
  }
}
