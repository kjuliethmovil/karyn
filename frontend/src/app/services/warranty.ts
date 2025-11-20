/**
 * Archivo: warranty.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar garantías (WarrantyI) con datos simulados en memoria.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { WarrantyI } from '../models/warranty';

@Injectable({
  providedIn: 'root'
})
export class WarrantyService {
  private warrantiesService = new BehaviorSubject<WarrantyI[]>([
    {
      warranty_id: 1,
      contract_id: 1,
      description: 'Garantía por daño accidental',
      amount: 100.0,
      status: 'ACTIVE'
    }
  ]);

  warranties$ = this.warrantiesService.asObservable();

  getWarranties() {
    return this.warrantiesService.value;
  }

  addWarranty(warranty: WarrantyI) {
    const warranties = this.warrantiesService.value;
    warranty.warranty_id = warranties.length
      ? Math.max(...warranties.map(w => w.warranty_id ?? 0)) + 1
      : 1;
    this.warrantiesService.next([...warranties, warranty]);
  }
  updateWarranty(updatedWarranty: WarrantyI) {
    const warranties = this.warrantiesService.value.map(warranty =>
      warranty.warranty_id === updatedWarranty.warranty_id ? updatedWarranty : warranty
    );
    this.warrantiesService.next(warranties);
  }
}
