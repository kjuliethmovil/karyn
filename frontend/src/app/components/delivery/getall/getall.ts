/**
 * Archivo: getall.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar todas las entregas (Delivery) usando PrimeNG Table y TailwindCSS.
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DeliveryI } from '../../../models/delivery';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DeliveryService } from '../../../services/delivery';

@Component({
  selector: 'app-delivery-getall',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DeliveryGetall {
  deliveries: DeliveryI[] = [];

  constructor(private deliveryService: DeliveryService) {
    this.deliveryService.deliveries$.subscribe(deliveries => {
      this.deliveries = deliveries;
    });
  }
}
