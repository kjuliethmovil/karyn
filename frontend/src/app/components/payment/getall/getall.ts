/**
 * Archivo: getall.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar todos los pagos (Payment) usando PrimeNG Table y TailwindCSS.
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PaymentI } from '../../../models/payment';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { PaymentService } from '../../../services/payment';

@Component({
  selector: 'app-payment-getall',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentGetall {
  payments: PaymentI[] = [];

  constructor(private paymentService: PaymentService) {
    this.paymentService.payments$.subscribe(payments => {
      this.payments = payments;
    });
  }
}
