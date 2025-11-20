// =====================================================
// Archivo: aside.ts
// Autor: Karyn Movil
// Fecha: 2025-09-30
// Descripción: Menú lateral con PanelMenu de PrimeNG y Tailwind
// =====================================================

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';

@Component({
  selector: 'app-aside',
  imports: [PanelMenu],
  templateUrl: './aside.html'
})
export class Aside implements OnInit {
  
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Gestión',
        icon: 'pi pi-fw pi-users',
        items: [
          { label: 'Clientes', icon: 'pi pi-user', routerLink: '/clientes' },
          { label: 'Proveedores', icon: 'pi pi-truck', routerLink: '/proveedores' }
        ]
      },
      {
        label: 'Inventario',
        icon: 'pi pi-fw pi-box',
        items: [
          { label: 'Equipos', icon: 'pi pi-cog', routerLink: '/equipos' },
          { label: 'Categorías', icon: 'pi pi-list', routerLink: '/category' },
          { label: 'Mantenimientos', icon: 'pi pi-wrench', routerLink: '/mantenimientos' }
        ]
      },
      // {
      //   label: 'Operaciones',
      //   icon: 'pi pi-fw pi-briefcase',
      //   items: [
      //     /* { label: 'Contratos', icon: 'pi pi-file-edit', routerLink: '/contratos' },
      //     { label: 'Detalles de Contratos', icon: 'pi pi-clone', routerLink: '/detalles-contrato' }, */
      //     { label: 'Garantías', icon: 'pi pi-shield', routerLink: '/garantias' },
      //    /*  { label: 'Entregas', icon: 'pi pi-send', routerLink: '/entregas' }, */
      //     { label: 'Devoluciones', icon: 'pi pi-undo', routerLink: '/devoluciones' }
      //   ]
      // },
      {
        label: 'Pagos',
        icon: 'pi pi-fw pi-credit-card',
        items: [
          { label: 'Gestionar Pagos', icon: 'pi pi-wallet', routerLink: '/pagos' }
        ]
      }
    ];
  }
}
