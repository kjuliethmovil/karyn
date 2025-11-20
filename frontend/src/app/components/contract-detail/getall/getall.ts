/**
 * Archivo: getall.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar todos los detalles de contrato usando PrimeNG Table y TailwindCSS.
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ContractDetailI } from '../../../models/contract-detail';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ContractDetailService } from '../../../services/contract-detail';

@Component({
  selector: 'app-contract-detail-getall',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ContractDetailGetall {
  contractDetails: ContractDetailI[] = [];

  constructor(private contractDetailService: ContractDetailService) {
    this.contractDetailService.contractdetails$.subscribe(details => {
      this.contractDetails = details;
    });
  }
}
