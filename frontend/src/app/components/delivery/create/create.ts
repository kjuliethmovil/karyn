/**
 * Archivo: create.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para registrar una nueva entrega (Delivery) usando Reactive Forms y TailwindCSS.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DeliveryService } from '../../../services/delivery';
import { DeliveryI } from '../../../models/delivery';

@Component({
  selector: 'app-delivery-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class DeliveryCreate {
  deliveryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    private router: Router
  ) {
    this.deliveryForm = this.fb.group({
      contract_id: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required],
      status: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.deliveryForm.valid) {
      const newDelivery: DeliveryI = this.deliveryForm.value;
      this.deliveryService.createDelivery(newDelivery);
      this.router.navigate(['/delivery/getall']);
    }
  }
}
