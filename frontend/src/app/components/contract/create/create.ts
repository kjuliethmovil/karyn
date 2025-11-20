/**
 * Archivo: create.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para crear un nuevo contrato usando Reactive Forms y TailwindCSS.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ContractService } from '../../../services/contract';
import { ContractI } from '../../../models/contract';

@Component({
  selector: 'app-contract-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class ContractCreate {
  contractForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contractService: ContractService,
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

  onSubmit() {
    if (this.contractForm.valid) {
      const newContract: ContractI = this.contractForm.value;
      this.contractService.createContract(newContract);
      this.router.navigate(['/contract/getall']);
    }
  }
}
