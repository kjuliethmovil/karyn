/**
 * Archivo: getall.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar todos los proveedores con PrimeNG + Tailwind,
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

import { ProviderI } from '../../../models/provider';
import { ProviderService } from '../../../services/provider';

@Component({
  selector: 'app-getall-providers',
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
export class ProviderGetall implements OnInit {

  providers: ProviderI[] = [];
  loading: boolean = false;

  constructor(
    private providerService: ProviderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadProviders();
  }

  // -----------------------------
  // CARGAR PROVEEDORES
  // -----------------------------
  loadProviders(): void {
    this.loading = true;

    this.providerService.getAllProviders().subscribe({
      next: (data) => {
        this.providers = data;
        this.providerService.updateLocalProviders(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading providers:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los proveedores'
        });
        this.loading = false;
      }
    });
  }

  // -----------------------------
  // ELIMINAR PROVEEDOR
  // -----------------------------
  deleteProvider(provider: ProviderI): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar al proveedor "${provider.name}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (provider.id) {
          this.providerService.deleteProviderLogic(provider.id).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Proveedor marcado como inactivo correctamente'
              });
              this.loadProviders(); // refrescar lista
            },
            error: (error) => {
              console.error('Error deleting provider:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el proveedor'
              });
            }
          });
        }
      }
    });
  }
}
