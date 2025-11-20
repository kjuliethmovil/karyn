/**
 * Archivo: payment.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar pagos (PaymentI) con datos simulados en memoria.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PaymentI } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentsService = new BehaviorSubject<PaymentI[]>([
    {
      payment_id: 1,
      contract_id: 1,
      payment_date: new Date('2025-02-15'),
      amount: 200.0,
      method: 'CARD',
      status: 'PAID',
      reference: 'REF123ABC'
    }
  ]);

  payments$ = this.paymentsService.asObservable();

  getPayments() {
    return this.paymentsService.value;
  }

  addPayment(payment: PaymentI) {
    const payments = this.paymentsService.value;
    payment.payment_id = payments.length
      ? Math.max(...payments.map(p => p.payment_id ?? 0)) + 1
      : 1;
    this.paymentsService.next([...payments, payment]);
  }
  updatePayment(updatedPayment: PaymentI) {
    const payments = this.paymentsService.value.map(payment =>
      payment.payment_id === updatedPayment.payment_id ? updatedPayment : payment
    );
    this.paymentsService.next(payments);
  }
}
