/**
 * Archivo: update.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para actualizar un detalle de contrato usando Reactive Forms y TailwindCSS.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ContractDetailService } from '../../../services/contract-detail';
import { ContractDetailI } from '../../../models/contract-detail';

@Component({
  selector: 'app-contract-detail-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class ContractDetailUpdate implements OnInit {
  detailForm: FormGroup;
  detailId!: number;

  constructor(
    private fb: FormBuilder,
    private contractDetailService: ContractDetailService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.detailId = Number(this.route.snapshot.paramMap.get('id'));
   /*  const detail = this.contractDetailService.getAllContractDetails().find(d => d.contract_detail_id === this.detailId);

    if (detail) {
      this.detailForm.patchValue(detail);
    } */
  }

  onSubmit() {
    if (this.detailForm.valid) {
      const updatedDetail: ContractDetailI = {
        contract_detail_id: this.detailId,
        ...this.detailForm.value
      };

      this.contractDetailService.updateContractDetail(updatedDetail);
      this.router.navigate(['/contract-detail/getall']);
    }
  }
}
