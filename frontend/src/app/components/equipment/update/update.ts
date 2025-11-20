/**
 * Archivo: update.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para actualizar un equipo usando Reactive Forms y TailwindCSS.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EquipmentService } from '../../../services/equipment';
import { EquipmentI } from '../../../models/equipment';
import { CategoryService } from '../../../services/category';
import { ProviderService } from '../../../services/provider';
import { CategoryI } from '../../../models/category';
import { ProviderI } from '../../../models/provider';

@Component({
  selector: 'app-equipment-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class EquipmentUpdate implements OnInit {
  equipmentForm: FormGroup;
  equipmentId!: number;
  categories: CategoryI[] = [];
  providers: ProviderI[] = [];
  statusOptions = ['ACTIVE', 'INACTIVE'];

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentService,
    private categoryService: CategoryService,
    private providerService: ProviderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.equipmentForm = this.fb.group({
      category_id: [null, Validators.required],
      provider_id: [null, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
      daily_rate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.equipmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategories();
    this.loadProviders();
    this.loadEquipment();
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

  private loadEquipment(): void {
    this.equipmentService.getEquipmentById(this.equipmentId).subscribe({
      next: (equipment) => {
        this.equipmentForm.patchValue(equipment);
      },
      error: (err) => console.error('Error loading equipment', err)
    });
  }

  onSubmit() {
    if (this.equipmentForm.valid) {
      const updatedEquipment: EquipmentI = {
        equipment_id: this.equipmentId,
        ...this.equipmentForm.value
      };

      this.equipmentService.updateEquipment(updatedEquipment).subscribe({
        next: () => this.router.navigate(['/equipos']),
        error: (err) => console.error('Error updating equipment:', err)
      });
    }
  }
}
