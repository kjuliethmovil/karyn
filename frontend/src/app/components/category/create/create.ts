/**
 * Archivo: create-category.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para crear una nueva categoría usando Reactive Forms y TailwindCSS.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryService } from '../../../services/category';
import { CategoryI } from '../../../models/category';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class CreateCategory {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const category: CategoryI = this.form.value;
      this.categoryService.createCategory(category).subscribe({
        next: () => this.router.navigate(['/category']),
        error: err => console.error('Error creating category:', err)
      });
    }
  }

  cancelar() {
    this.router.navigate(['/category']);
  }
}
