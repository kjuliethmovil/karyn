/**
 * Archivo: app.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Definición de las rutas principales de la aplicación Rentool2 en plural (español)
 */

import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { AuthGuard } from './guards/authguard';

// Importación de componentes de Clientes
import { ClientGetall } from './components/client/getall/getall';
import { CreateClient } from './components/client/create/create';
import {  UpdateClients } from './components/client/update/update';

// Importación de componentes de Proveedores
import { ProviderGetall } from './components/provider/getall/getall';
import { ProviderCreate } from './components/provider/create/create';
import { UpdateProviders } from './components/provider/update/update';

// Importación de componentes de Equipos
import { EquipmentGetall } from './components/equipment/getall/getall';
import { EquipmentCreate } from './components/equipment/create/create';
import { EquipmentUpdate } from './components/equipment/update/update';

// Importación de componentes de Categorías
import { CategoryGetall } from './components/category/getall/getall';
import { CreateCategory } from './components/category/create/create';
import { UpdateCategory } from './components/category/update/update';

// Importación de componentes de Mantenimientos
import { MaintenanceGetall } from './components/maintenance/getall/getall';
import { MaintenanceCreate } from './components/maintenance/create/create';
import { MaintenanceUpdate } from './components/maintenance/update/update';

// Importación de componentes de Contratos
import { ContractGetall } from './components/contract/getall/getall';
import { ContractCreate } from './components/contract/create/create';
import { ContractUpdate } from './components/contract/update/update';

// Importación de componentes de Detalle de Contrato
import { ContractDetailGetall } from './components/contract-detail/getall/getall';
import { ContractDetailCreate } from './components/contract-detail/create/create';
import { ContractDetailUpdate } from './components/contract-detail/update/update';

// Importación de componentes de Garantías
import { WarrantyGetall } from './components/warranty/getall/getall';
import { WarrantyCreate } from './components/warranty/create/create';
import { WarrantyUpdate } from './components/warranty/update/update';

// Importación de componentes de Entregas
import { DeliveryGetall } from './components/delivery/getall/getall';
import { DeliveryCreate } from './components/delivery/create/create';
import { DeliveryUpdate } from './components/delivery/update/update';

// Importación de componentes de Devoluciones (returns)
import { ReturnsGetall } from './components/returns/getall/getall';
import { ReturnsCreate } from './components/returns/create/create';
import { ReturnsUpdate } from './components/returns/update/update';

// Importación de componentes de Pagos
import { PaymentGetall } from './components/payment/getall/getall';
import { PaymentCreate } from './components/payment/create/create';
import { PaymentUpdate } from './components/payment/update/update';

export const routes: Routes = [
  // Rutas de Clientes
  { path: 'clientes', component: ClientGetall, canActivate: [AuthGuard] },
  { path: 'clientes/nuevo', component: CreateClient, canActivate: [AuthGuard] },
  { path: 'clientes/editar/:id', component: UpdateClients, canActivate: [AuthGuard] },

  // Rutas de Proveedores
  { path: 'proveedores', component: ProviderGetall, canActivate: [AuthGuard] },
  { path: 'proveedores/nuevo', component: ProviderCreate, canActivate: [AuthGuard] },
  { path: 'proveedores/editar/:id', component: UpdateProviders, canActivate: [AuthGuard] },

  // Rutas de Equipos
  { path: 'equipos', component: EquipmentGetall, canActivate: [AuthGuard] },
  { path: 'equipos/nuevo', component: EquipmentCreate, canActivate: [AuthGuard] },
  { path: 'equipos/editar/:id', component: EquipmentUpdate, canActivate: [AuthGuard] },

  // Rutas de Categorías
  { path: 'category', component: CategoryGetall, canActivate: [AuthGuard] },
  { path: 'categorias/nuevo', component: CreateCategory, canActivate: [AuthGuard] },
  { path: 'categorias/editar/:id', component: UpdateCategory, canActivate: [AuthGuard] },

  // Rutas de Mantenimientos
  { path: 'mantenimientos', component: MaintenanceGetall, canActivate: [AuthGuard] },
  { path: 'mantenimientos/nuevo', component: MaintenanceCreate, canActivate: [AuthGuard] },
  { path: 'mantenimientos/editar/:id', component: MaintenanceUpdate, canActivate: [AuthGuard] },

  // Rutas de Contratos
  { path: 'contratos', component: ContractGetall, canActivate: [AuthGuard] },
  { path: 'contratos/nuevo', component: ContractCreate, canActivate: [AuthGuard] },
  { path: 'contratos/editar/:id', component: ContractUpdate, canActivate: [AuthGuard] },

  // Rutas de Detalle de Contrato
  { path: 'detalles-contrato', component: ContractDetailGetall, canActivate: [AuthGuard] },
  { path: 'detalles-contrato/nuevo', component: ContractDetailCreate, canActivate: [AuthGuard] },
  { path: 'detalles-contrato/editar/:id', component: ContractDetailUpdate, canActivate: [AuthGuard] },

  // Rutas de Garantías
  { path: 'garantias', component: WarrantyGetall, canActivate: [AuthGuard] },
  { path: 'garantias/nuevo', component: WarrantyCreate, canActivate: [AuthGuard] },
  { path: 'garantias/editar/:id', component: WarrantyUpdate, canActivate: [AuthGuard] },

  // Rutas de Entregas
  { path: 'entregas', component: DeliveryGetall, canActivate: [AuthGuard] },
  { path: 'entregas/nuevo', component: DeliveryCreate, canActivate: [AuthGuard] },
  { path: 'entregas/editar/:id', component: DeliveryUpdate, canActivate: [AuthGuard] },

  // Rutas de Devoluciones
  { path: 'devoluciones', component: ReturnsGetall, canActivate: [AuthGuard] },
  { path: 'devoluciones/nuevo', component: ReturnsCreate, canActivate: [AuthGuard] },
  { path: 'devoluciones/editar/:id', component: ReturnsUpdate, canActivate: [AuthGuard] },

  // Rutas de Pagos
  { path: 'pagos', component: PaymentGetall, canActivate: [AuthGuard] },
  { path: 'pagos/nuevo', component: PaymentCreate, canActivate: [AuthGuard] },
  { path: 'pagos/editar/:id', component: PaymentUpdate, canActivate: [AuthGuard] },

  // Rutas de Autenticación
  {
     path: "login",
     component: Login
  },
  {
    path: "register",
    component: Register
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  },

  // Redirección por defecto
  { path: 'home', component: DashboardComponent, pathMatch: 'full' },

  // Wildcard para rutas no encontradas
  //{ path: '**', component: DashboardComponent }

];
