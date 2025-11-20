/**
 * Archivo: provider.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar proveedores (ProviderI) usando backend y BehaviorSubject.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProviderI } from '../models/provider';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private baseUrl = 'http://localhost:4000/api/providers';

  private providersSubject = new BehaviorSubject<ProviderI[]>([]);
  public providers$ = this.providersSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // ============================
  //   🔐 TOKEN Y HEADERS
  // ============================
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // ============================
  //       📌 CRUD PRINCIPAL
  // ============================

  getAllProviders(): Observable<ProviderI[]> {
    return this.http.get<ProviderI[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getProviderById(id: number): Observable<ProviderI> {
    return this.http.get<ProviderI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createProvider(provider: ProviderI): Observable<ProviderI> {
    return this.http.post<ProviderI>(this.baseUrl, provider, { headers: this.getHeaders() });
  }

  updateProvider(provider: ProviderI): Observable<ProviderI> {
    return this.http.patch<ProviderI>(
      `${this.baseUrl}/${provider.id}`,
      provider,
      { headers: this.getHeaders() }
    );
  }

  deleteProviderLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  // ============================
  //   🔄 MÉTODOS DE SINCRONIZACIÓN
  // ============================

  updateLocalProviders(providers: ProviderI[]): void {
    this.providersSubject.next(providers);
  }

  refreshProviders(): void {
    this.getAllProviders().subscribe(providers => {
      this.providersSubject.next(providers);
    });
  }
}
