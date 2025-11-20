// routes/returns.routes.ts
import { Router, Application } from "express";
import { ReturnsController } from "../controllers/returns.controller";
import { authMiddleware } from "../middleware/auth";


export class ReturnsRoutes {
  public returnsController: ReturnsController = new ReturnsController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/returns/public")
      .get(this.returnsController.getAllReturns)
      .post(this.returnsController.createReturn);

    app.route("/api/returns/public/:id")
      .get(this.returnsController.getReturnById)
      .patch(this.returnsController.updateReturn)
      .delete(this.returnsController.deleteReturn);

    app.route("/api/returns/public/:id/logic")
      .delete(this.returnsController.deleteReturnAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/returns")
      .get(authMiddleware, this.returnsController.getAllReturns)
      .post(authMiddleware, this.returnsController.createReturn);

    app.route("/api/returns/:id")
      .get(authMiddleware, this.returnsController.getReturnById)
      .patch(authMiddleware, this.returnsController.updateReturn)
      .delete(authMiddleware, this.returnsController.deleteReturn);

    app.route("/api/returns/:id/logic")
      .delete(authMiddleware, this.returnsController.deleteReturnAdv);
  }
}
