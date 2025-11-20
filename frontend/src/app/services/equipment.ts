/**
 * Archivo: equipment.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar equipos (EquipmentI) con datos simulados en memoria.
 */

import { Injectable } from '@angular/core';
import { EquipmentI } from '../models/equipment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private baseUrl = 'http://localhost:4000/api/equipments';
  private equipmentsSubject = new BehaviorSubject<EquipmentI[]>([]);
  public equipments$ = this.equipmentsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }


  getAllEquipments(): Observable<EquipmentI[]> {
    return this.http.get<EquipmentI[]>(this.baseUrl, { headers: this.getHeaders() })
    // .pipe(
    //   tap(response => {
    //       // console.log('Fetched equipments:', response);
    //     })
    // )
    ;
  }

  getEquipmentById(id: number): Observable<EquipmentI> {
    return this.http.get<EquipmentI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createEquipment(equipment: EquipmentI): Observable<EquipmentI> {
    return this.http.post<EquipmentI>(this.baseUrl, equipment, { headers: this.getHeaders() });
  }

  updateEquipment(equipment: EquipmentI): Observable<EquipmentI> {
    return this.http.patch<EquipmentI>(`${this.baseUrl}/${equipment.equipment_id}`, equipment, { headers: this.getHeaders() });
  }

  deleteEquipmentLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  // Método para actualizar el estado local de equipments
  updateLocalEquipments(equipments: EquipmentI[]): void {
    this.equipmentsSubject.next(equipments);
  }

  refreshEquipments(): void {
    this.getAllEquipments().subscribe(equipments => {
      this.equipmentsSubject.next(equipments);
    });
  }
}
