/**
 * Archivo: update.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para actualizar una entrega (Delivery) usando Reactive Forms y TailwindCSS.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DeliveryService } from '../../../services/delivery';
import { DeliveryI } from '../../../models/delivery';

@Component({
  selector: 'app-delivery-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class DeliveryUpdate implements OnInit {
  deliveryForm: FormGroup;
  deliveryId!: number;

  constructor(
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.deliveryId = Number(this.route.snapshot.paramMap.get('id'));
    /* const delivery = this.deliveryService.getDeliveries().find(d => d.delivery_id === this.deliveryId);

    if (delivery) {
      this.deliveryForm.patchValue(delivery);
    } */
  }

  onSubmit() {
    if (this.deliveryForm.valid) {
      const updatedDelivery: DeliveryI = {
        delivery_id: this.deliveryId,
        ...this.deliveryForm.value
      };

      this.deliveryService.updateDelivery(updatedDelivery);
      this.router.navigate(['/delivery/getall']);
    }
  }
}
