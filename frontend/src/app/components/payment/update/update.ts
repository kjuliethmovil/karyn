/**
 * Archivo: update.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para actualizar un pago (Payment) usando Reactive Forms y TailwindCSS.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaymentService } from '../../../services/payment';
import { PaymentI } from '../../../models/payment';

@Component({
  selector: 'app-payment-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class PaymentUpdate implements OnInit {
  paymentForm: FormGroup;
  paymentId!: number;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.paymentId = Number(this.route.snapshot.paramMap.get('id'));
    const payment = this.paymentService.getPayments().find(p => p.payment_id === this.paymentId);

    if (payment) {
      this.paymentForm.patchValue(payment);
    }
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const updatedPayment: PaymentI = {
        payment_id: this.paymentId,
        ...this.paymentForm.value
      };

      this.paymentService.updatePayment(updatedPayment);
      this.router.navigate(['/payment/getall']);
    }
  }
}
