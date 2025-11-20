/**
 * Archivo: update.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para actualizar un contrato usando Reactive Forms y TailwindCSS.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ContractService } from '../../../services/contract';
import { ContractI } from '../../../models/contract';

@Component({
  selector: 'app-contract-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class ContractUpdate implements OnInit {
  contractForm: FormGroup;
  contractId!: number;

  constructor(
    private fb: FormBuilder,
    private contractService: ContractService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contractForm = this.fb.group({
      client_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      total_amount: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.contractId = Number(this.route.snapshot.paramMap.get('id'));

    /* const contract = this.contractService.getContracts().find(c => c.contract_id === this.contractId);

    if (contract) {
      this.contractForm.patchValue(contract);
    } */
  }

  onSubmit() {
    if (this.contractForm.valid) {
      const updatedContract: ContractI = {
        contract_id: this.contractId,
        ...this.contractForm.value
      };

      this.contractService.updateContract(updatedContract);
      this.router.navigate(['/contract/getall']);
    }
  }
}
