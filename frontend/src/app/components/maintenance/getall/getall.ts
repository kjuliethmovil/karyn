/**
 * Archivo: getall.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar mantenimientos (Maintenance) usando PrimeNG Table y TailwindCSS,
 * incluyendo carga inicial, eliminación con confirmación y notificaciones.
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MaintenanceI } from '../../../models/maintenance';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MaintenanceService } from '../../../services/maintenance';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-maintenance-getall',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService, MessageService]
})
export class MaintenanceGetall implements OnInit {
  maintenances: MaintenanceI[] = [];
  loading: boolean = false;

  constructor(
    private maintenanceService: MaintenanceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadMaintenances();
  }

  // -----------------------------
  // CARGAR MANTENIMIENTOS
  // -----------------------------
  loadMaintenances(): void {
    this.loading = true;
    this.maintenanceService.getAllMaintenances().subscribe({
      next: (data) => {
        this.maintenances = data;
        this.maintenanceService.updateLocalMaintenances(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading maintenances:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los mantenimientos'
        });
        this.loading = false;
      }
    });
  }

  // -----------------------------
  // ELIMINAR MANTENIMIENTO
  // -----------------------------
  deleteMaintenance(id: number) {
  this.confirmationService.confirm({
    message: '¿Estás seguro que deseas eliminar este mantenimiento?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.maintenanceService.deleteMaintenance(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'Mantenimiento eliminado correctamente'
          });

          // Recargar la lista
          this.loadMaintenances();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el mantenimiento'
          });
        }
      });
    }
  });
}
}
