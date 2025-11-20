/**
 * Archivo: getall.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar todos los equipos con PrimeNG + Tailwind,
 * incluyendo carga inicial, eliminación con confirmación y notificaciones.
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { EquipmentI } from '../../../models/equipment';
import { EquipmentService } from '../../../services/equipment';

@Component({
  selector: 'app-equipment-getall',
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
export class EquipmentGetall implements OnInit {

  equipments: EquipmentI[] = [];
  loading: boolean = false;

  constructor(
    private equipmentService: EquipmentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadEquipments();
  }

  // -----------------------------
  // CARGAR EQUIPOS
  // -----------------------------
  loadEquipments(): void {
    this.loading = true;

    this.equipmentService.getAllEquipments().subscribe({
      next: (data) => {
        this.equipments = data;
        this.equipmentService.updateLocalEquipments(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading equipments:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los equipos'
        });
        this.loading = false;
      }
    });
  }

  // -----------------------------
  // ELIMINAR EQUIPO
  // -----------------------------
  deleteEquipment(equipment: EquipmentI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el equipo "${equipment.name}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (equipment.equipment_id) {
          this.equipmentService.deleteEquipmentLogic(equipment.equipment_id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Equipo marcado como inactivo correctamente'
              });
              this.loadEquipments(); // refrescar lista
            },
            error: (error) => {
              console.error('Error deleting equipment:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el equipo'
              });
            }
          });
        }
      }
    });
  }
}
