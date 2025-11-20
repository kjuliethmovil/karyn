/**
 * Archivo: create.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para registrar un mantenimiento (Maintenance) usando Reactive Forms y TailwindCSS.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MaintenanceService } from '../../../services/maintenance';
import { MaintenanceI } from '../../../models/maintenance';

@Component({
  selector: 'app-maintenance-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class MaintenanceCreate {
  form: FormGroup;
  statusOptions = ['ACTIVE', 'INACTIVE'];
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private maintenanceService: MaintenanceService
  ) {
    this.form = this.fb.group({
      equipment_id: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', [Validators.required, Validators.min(0)]],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const maintenance: MaintenanceI = this.form.value;
      this.maintenanceService.createMaintenance(maintenance).subscribe({
        next: () => this.router.navigate(['/mantenimientos']),
        error: err => console.error('Error creating maintenance:', err)
      });
    }
  }

  cancelar() {
    this.router.navigate(['/mantenimientos']);
  }
}
