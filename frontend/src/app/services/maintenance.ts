/**
 * Archivo: maintenance.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar mantenimientos (MaintenanceI) con datos simulados en memoria.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AuthService } from './auth';
import { MaintenanceI } from '../models/maintenance';



@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private baseUrl = 'http://localhost:4000/api/maintenances';
  private maintenancesSubject = new BehaviorSubject<MaintenanceI[]>([]);
  public maintenances$ = this.maintenancesSubject.asObservable();

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


  getAllMaintenances(): Observable<MaintenanceI[]> {
    return this.http.get<MaintenanceI[]>(this.baseUrl, { headers: this.getHeaders() })
    // .pipe(
    //   tap(response => {
    //       // console.log('Fetched maintenances:', response);
    //     })
    // )
    ;
  }

  getMaintenanceById(id: number): Observable<MaintenanceI> {
    return this.http.get<MaintenanceI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createMaintenance(maintenance: MaintenanceI): Observable<MaintenanceI> {
    return this.http.post<MaintenanceI>(this.baseUrl, maintenance, { headers: this.getHeaders() });
  }

  updateMaintenance( maintenance: MaintenanceI): Observable<MaintenanceI> {
    return this.http.patch<MaintenanceI>(`${this.baseUrl}/${maintenance.maintenance_id}`, maintenance, { headers: this.getHeaders() });
  }

  deleteMaintenance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteMaintenanceLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  // Método para actualizar el estado local de maintenances
  updateLocalMaintenances(maintenances: MaintenanceI[]): void {
    this.maintenancesSubject.next(maintenances);
  }

  refreshMaintenances(): void {
    this.getAllMaintenances().subscribe(maintenances => {
      this.maintenancesSubject.next(maintenances);
    });
  }
}