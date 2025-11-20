/**
 * Archivo: create.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para registrar una nueva garantía (Warranty) usando Reactive Forms y TailwindCSS.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { WarrantyService } from '../../../services/warranty';
import { WarrantyI } from '../../../models/warranty';

@Component({
  selector: 'app-warranty-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class WarrantyCreate {
  warrantyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private warrantyService: WarrantyService,
    private router: Router
  ) {
    this.warrantyForm = this.fb.group({
      contract_id: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.warrantyForm.valid) {
      const newWarranty: WarrantyI = this.warrantyForm.value;
      this.warrantyService.addWarranty(newWarranty);
      this.router.navigate(['/warranty/getall']);
    }
  }
}
