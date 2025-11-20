/**
 * Archivo: getall.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar todos los contratos usando PrimeNG Table y TailwindCSS.
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ContractI } from '../../../models/contract';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ContractService } from '../../../services/contract';

@Component({
  selector: 'app-contract-getall',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ContractGetall {
  contracts: ContractI[] = [];

  constructor(private contractService: ContractService) {
    this.contractService.contracts$.subscribe(contracts => {
      this.contracts = contracts;
    });
  }
}
