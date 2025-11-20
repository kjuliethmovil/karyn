/**
 * Archivo: getall.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar todas las garantías (Warranty) usando PrimeNG Table y TailwindCSS.
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { WarrantyI } from '../../../models/warranty';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { WarrantyService } from '../../../services/warranty';

@Component({
  selector: 'app-warranty-getall',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WarrantyGetall {
  warranties: WarrantyI[] = [];

  constructor(private warrantyService: WarrantyService) {
    this.warrantyService.warranties$.subscribe(warranties => {
      this.warranties = warranties;
    });
  }
}
