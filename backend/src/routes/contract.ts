// routes/contract.routes.ts
import { Router, Application } from "express";
import { ContractController } from "../controllers/contract.controller";
import { authMiddleware } from "../middleware/auth";

export class ContractRoutes {
  public contractController: ContractController = new ContractController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/contracts/public")
      .get(this.contractController.getAllContracts)
      .post(this.contractController.createContract);

    app.route("/api/contracts/public/:id")
      .get(this.contractController.getContractById)
      .patch(this.contractController.updateContract)
      .delete(this.contractController.deleteContract);

    app.route("/api/contracts/public/:id/logic")
      .delete(this.contractController.deleteContractAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/contracts")
      .get(authMiddleware, this.contractController.getAllContracts)
      .post(authMiddleware, this.contractController.createContract);

    app.route("/api/contracts/:id")
      .get(authMiddleware, this.contractController.getContractById)
      .patch(authMiddleware, this.contractController.updateContract)
      .delete(authMiddleware, this.contractController.deleteContract);

    app.route("/api/contracts/:id/logic")
      .delete(authMiddleware, this.contractController.deleteContractAdv);
  }
}
