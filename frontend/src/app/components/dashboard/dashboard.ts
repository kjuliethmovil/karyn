/**
 * Archivo: dashboard.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Lógica del Dashboard principal de Rentool2
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
 // Listado por categorías
  categories = [
    { name: 'Electricidad', available: 8 },
    { name: 'Construcción', available: 5 },
    { name: 'Jardinería', available: 3 },
  ];

  // Equipos para formulario
  equipments = ['Taladro', 'Compresor', 'Cortadora', 'Generador'];

  // Datos del contrato
  contract = {
    equipment: '',
    days: 1,
    rate: 0,
  };

  // Resumen
  deliveries = [
    { date: '2025-10-03', item: 'Taladro' },
    { date: '2025-10-05', item: 'Compresor' },
  ];

  payments = [
    { date: '2025-10-04', amount: 200 },
    { date: '2025-10-06', amount: 350 },
  ];

  damages = [
    { item: 'Generador', note: 'Falla en arranque' },
    { item: 'Cortadora', note: 'Cuchilla dañada' },
  ];

  // Métodos
  createContract() {
    alert(
      `Contrato creado: ${this.contract.equipment}, ${this.contract.days} días, tarifa $${this.contract.rate}/día`
    );
  }

}
