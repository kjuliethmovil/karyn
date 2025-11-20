/**
 * Archivo: delivery.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar entregas (DeliveryI) con datos simulados en memoria.
 */

import { Injectable } from '@angular/core';
import { DeliveryI } from '../models/delivery';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private baseUrl = 'http://localhost:4000/api/deliveries';
  private deliveriesSubject = new BehaviorSubject<DeliveryI[]>([]);
  public deliveries$ = this.deliveriesSubject.asObservable();

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


  getAllDeliveries(): Observable<DeliveryI[]> {
    return this.http.get<DeliveryI[]>(this.baseUrl, { headers: this.getHeaders() })
    // .pipe(
    //   tap(response => {
    //       // console.log('Fetched deliveries:', response);
    //     })
    // )
    ;
  }

  getDeliveryById(id: number): Observable<DeliveryI> {
    return this.http.get<DeliveryI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createDelivery(delivery: DeliveryI): Observable<DeliveryI> {
    return this.http.post<DeliveryI>(this.baseUrl, delivery, { headers: this.getHeaders() });
  }

  updateDelivery(delivery: DeliveryI): Observable<DeliveryI> {
    return this.http.patch<DeliveryI>(`${this.baseUrl}/${delivery.delivery_id}`, delivery, { headers: this.getHeaders() });
  }

  deleteDelivery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteDeliveryLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  // Método para actualizar el estado local de deliveries
  updateLocalDeliveries(deliveries: DeliveryI[]): void {
    this.deliveriesSubject.next(deliveries);
  }

  refreshDeliveries(): void {
    this.getAllDeliveries().subscribe(deliveries => {
      this.deliveriesSubject.next(deliveries);
    });
  }
}