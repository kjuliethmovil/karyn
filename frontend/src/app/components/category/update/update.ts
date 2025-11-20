/**
 * Archivo: update.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para actualizar una categoría existente usando Reactive Forms, PrimeNG y TailwindCSS.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { CategoryService } from '../../../services/category';
import { CategoryI } from '../../../models/category';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './update.html',
  styleUrls: ['./update.css'],
  providers: [MessageService]
})
export class UpdateCategory implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  categoryId: number = 0;

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryId = parseInt(id);
      this.loadCategory();
    }
  }

  // =======================================================
  // 🔹 Cargar categoría
  // =======================================================
  loadCategory(): void {
    this.loading = true;
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (response: any) => {
        const category: CategoryI = response.category ?? response;

        this.form.patchValue({
          name: category.name,
          description: category.description,
          status: category.status
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar categoría:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la información de la categoría'
        });
        this.loading = false;
      }
    });
  }

  // =======================================================
  // 🔹 GUARDAR
  // =======================================================
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const value = this.form.value;

      this.categoryService.updateCategory({
        id: this.categoryId,
        name: value.name,
        description: value.description,
        status: value.status
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Categoría actualizada correctamente'
          });

          setTimeout(() => {
            this.router.navigate(['/category']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error al actualizar categoría:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar la categoría'
          });
          this.loading = false;
        }
      });

    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor complete todos los campos requeridos'
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/category']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) return `${fieldName} es requerido`;
    }
    return '';
  }
}
