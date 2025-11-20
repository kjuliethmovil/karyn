// routes/index.ts
import { Router } from "express";
import { ClientRoutes } from "./client";
import { ContractRoutes } from "./contract";
import { ContractDetailRoutes } from "./contractDetail";
import { DeliveryRoutes } from "./delivery";
import { EquipmentRoutes } from "./equipment";
import { MaintenanceRoutes } from "./maintenance";
import { PaymentRoutes } from "./payment";
import { ProviderRoutes } from "./provider";
import { ReturnsRoutes } from "./returns";
import { WarrantyRoutes } from "./warranty";
import { RefreshTokenRoutes } from "./authorization/refresh_token";
import { ResourceRoutes } from "./authorization/resource";
import { ResourceRoleRoutes } from "./authorization/resourceRole";
import { RoleRoutes } from "./authorization/role";
import { RoleUserRoutes } from "./authorization/role_user";
import { UserRoutes } from "./authorization/user";
import { CategoryRoutes } from "./category";
import { AuthRoutes } from "./authorization/auth";

// Rentool Entities


export class Routes {
  // Rentool
  public clientRoutes: ClientRoutes = new ClientRoutes();
  public contractRoutes: ContractRoutes = new ContractRoutes();
  public contractDetailRoutes: ContractDetailRoutes = new ContractDetailRoutes();
  public deliveryRoutes: DeliveryRoutes = new DeliveryRoutes();
  public equipmentRoutes: EquipmentRoutes = new EquipmentRoutes();
  public maintenanceRoutes: MaintenanceRoutes = new MaintenanceRoutes();
  public paymentRoutes: PaymentRoutes = new PaymentRoutes();
  public providerRoutes: ProviderRoutes = new ProviderRoutes();
  public returnsRoutes: ReturnsRoutes = new ReturnsRoutes();
  public warrantyRoutes: WarrantyRoutes = new WarrantyRoutes();
  public categoryRoutes: CategoryRoutes = new CategoryRoutes();

  // Authentication
  public userRoutes: UserRoutes = new UserRoutes();
  public roleRoutes: RoleRoutes = new RoleRoutes();
  public roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
  public refreshTokenRoutes: RefreshTokenRoutes = new RefreshTokenRoutes();
  public resourceRoutes: ResourceRoutes = new ResourceRoutes(); // Add ResourceRoutes
  public resourceRoleRoutes: ResourceRoleRoutes = new ResourceRoleRoutes(); // Add ResourceRoutes

  public authRoutes: AuthRoutes = new AuthRoutes();
}
