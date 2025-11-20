// routes/contractDetail.routes.ts
import { Router, Application } from "express";
import { ContractDetailController } from "../controllers/contract_detail.controller";
import { authMiddleware } from "../middleware/auth";


export class ContractDetailRoutes {
  public contractDetailController: ContractDetailController = new ContractDetailController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/contract-details/public")
      .get(this.contractDetailController.getAllContractDetails)
      .post(this.contractDetailController.createContractDetail);

    app.route("/api/contract-details/public/:id")
      .get(this.contractDetailController.getContractDetailById)
      .patch(this.contractDetailController.updateContractDetail)
      .delete(this.contractDetailController.deleteContractDetail);

    app.route("/api/contract-details/public/:id/logic")
      .delete(this.contractDetailController.deleteContractDetailAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/contract-details")
      .get(authMiddleware, this.contractDetailController.getAllContractDetails)
      .post(authMiddleware, this.contractDetailController.createContractDetail);

    app.route("/api/contract-details/:id")
      .get(authMiddleware, this.contractDetailController.getContractDetailById)
      .patch(authMiddleware, this.contractDetailController.updateContractDetail)
      .delete(authMiddleware, this.contractDetailController.deleteContractDetail);

    app.route("/api/contract-details/:id/logic")
      .delete(authMiddleware, this.contractDetailController.deleteContractDetailAdv);
  }
}
