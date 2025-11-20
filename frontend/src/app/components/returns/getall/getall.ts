/**
 * Archivo: getall.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar todas las devoluciones (Returns) usando PrimeNG Table y TailwindCSS.
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ReturnsI } from '../../../models/returns';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ReturnsService } from '../../../services/returns';

@Component({
  selector: 'app-returns-getall',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReturnsGetall implements OnInit {
  returns: ReturnsI[] = [];

  constructor(private returnsService: ReturnsService) {
    this.returnsService.returns$.subscribe(returns => {
      this.returns = returns;
    });
  }

  ngOnInit(): void {
    this.returnsService.getAllReturns().subscribe();
  }
}
