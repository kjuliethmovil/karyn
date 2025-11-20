/**
 * Archivo: getall.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar todas las categorías con PrimeNG + Tailwind,
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

import { CategoryI } from '../../../models/category';
import { CategoryService } from '../../../services/category';

@Component({
  selector: 'app-getall-categories',
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
export class CategoryGetall implements OnInit {

  categories: CategoryI[] = [];
  loading: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // -----------------------------
  // CARGAR CATEGORÍAS
  // -----------------------------
  loadCategories(): void {
    this.loading = true;

    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.categoryService.updateLocalCategories(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las categorías'
        });
        this.loading = false;
      }
    });
  }

  // -----------------------------
  // ELIMINAR CATEGORÍA
  // -----------------------------
  deleteCategory(category: CategoryI): void {
  this.confirmationService.confirm({
    message: `¿Está seguro de eliminar la categoría "${category.name}"?`,
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      if (category.id) { // <-- aquí usamos 'id' en lugar de 'category_id'
        this.categoryService.deleteCategory(category.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Categoría eliminada correctamente'
            });
            this.loadCategories();
          },
          error: (error) => {
            console.error('Error deleting category:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar la categoría'
            });
          }
        });
      }
    }
  });
}


}
