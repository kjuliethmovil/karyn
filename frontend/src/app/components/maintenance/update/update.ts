/**
 * Archivo: update.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para actualizar un mantenimiento (Maintenance) usando Reactive Forms y TailwindCSS.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MaintenanceService } from '../../../services/maintenance';
import { MaintenanceI } from '../../../models/maintenance';

@Component({
  selector: 'app-maintenance-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class MaintenanceUpdate implements OnInit {
  maintenanceForm: FormGroup;
  maintenanceId!: number;

  constructor(
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.maintenanceForm = this.fb.group({
      equipment_id: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.maintenanceId = Number(this.route.snapshot.paramMap.get('id'));
    const maintenance = this.maintenanceService.getAllMaintenances.apply((m: { maintenance_id: number; }) => m.maintenance_id === this.maintenanceId);

    if (maintenance) {
      this.maintenanceForm.patchValue(maintenance);
    }
  }

  onSubmit() {
    if (this.maintenanceForm.valid) {
      const updatedMaintenance: MaintenanceI = {
        maintenance_id: this.maintenanceId,
        ...this.maintenanceForm.value
      };

      this.maintenanceService.updateMaintenance(updatedMaintenance);
      this.router.navigate(['/maintenance/getall']);
    }
  }
}
