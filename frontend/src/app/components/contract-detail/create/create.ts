/**
 * Archivo: create.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para crear un nuevo detalle de contrato usando Reactive Forms y TailwindCSS.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ContractDetailService } from '../../../services/contract-detail';
import { ContractDetailI } from '../../../models/contract-detail';

@Component({
  selector: 'app-contract-detail-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class ContractDetailCreate {
  detailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contractDetailService: ContractDetailService,
    private router: Router
  ) {
    this.detailForm = this.fb.group({
      contract_id: ['', Validators.required],
      equipment_id: ['', Validators.required],
      quantity: ['', Validators.required],
      daily_rate: ['', Validators.required],
      days: ['', Validators.required],
      subtotal: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.detailForm.valid) {
      const newDetail: ContractDetailI = this.detailForm.value;
      this.contractDetailService.createContractDetail(newDetail);
      this.router.navigate(['/contract-detail/getall']);
    }
  }
}
