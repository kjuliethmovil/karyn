/**
 * Archivo: create.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para registrar un nuevo pago (Payment) usando Reactive Forms y TailwindCSS.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaymentService } from '../../../services/payment';
import { PaymentI } from '../../../models/payment';

@Component({
  selector: 'app-payment-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class PaymentCreate {
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.paymentForm = this.fb.group({
      contract_id: ['', Validators.required],
      payment_date: ['', Validators.required],
      amount: ['', Validators.required],
      method: ['', Validators.required],
      status: ['', Validators.required],
      reference: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const newPayment: PaymentI = this.paymentForm.value;
      this.paymentService.addPayment(newPayment);
      this.router.navigate(['/payment/getall']);
    }
  }
}
