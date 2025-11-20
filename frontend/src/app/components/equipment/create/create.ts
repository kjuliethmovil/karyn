/**
 * Archivo: create-equipment.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-11-19
 * Descripción: Componente para crear un equipo con Reactive Forms, usando el modelo EquipmentI.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EquipmentService } from '../../../services/equipment';
import { EquipmentI } from '../../../models/equipment';
import { CategoryService } from '../../../services/category';
import { ProviderService } from '../../../services/provider';
import { CategoryI } from '../../../models/category';
import { ProviderI } from '../../../models/provider';

@Component({
  selector: 'app-create-equipment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class EquipmentCreate implements OnInit {
  form: FormGroup;
  statusOptions = ['ACTIVE', 'INACTIVE'];
   categories: CategoryI[] = [];
   providers: ProviderI[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private equipmentService: EquipmentService,
    private categoryService: CategoryService,
    private providerService: ProviderService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      category_id: ['', Validators.required],
      provider_id: ['', Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProviders();
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Error loading categories', err)
    });
  }

  private loadProviders(): void {
    this.providerService.getAllProviders().subscribe({
      next: (data) => (this.providers = data),
      error: (err) => console.error('Error loading providers', err)
    });
  }

  submit() {
    if (this.form.valid) {
      const equipment: EquipmentI = this.form.value;
      this.equipmentService.createEquipment(equipment).subscribe({
        next: () => this.router.navigate(['/equipos']),
        error: err => console.error('Error creating equipment:', err)
      });
    }
  }

  cancelar() {
    this.router.navigate(['/equipos']);
  }
}
