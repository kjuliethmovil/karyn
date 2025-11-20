/**
 * Archivo: returns.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar devoluciones (ReturnsI) con datos simulados en memoria.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { ReturnsI } from '../models/returns';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ReturnsService {
  private baseUrl = 'http://localhost:4000/api/returns';
  private returnsSubject = new BehaviorSubject<ReturnsI[]>([]);
  public returns$ = this.returnsSubject.asObservable();

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
  private getUrl(): string {
    // Si no hay token usamos el endpoint público
    const token = this.authService.getToken();
    return token ? this.baseUrl : `${this.baseUrl}/public`;
  }

  getAllReturns(): Observable<ReturnsI[]> {
    return this.http.get<ReturnsI[]>(this.getUrl(), { headers: this.getHeaders() }).pipe(
      tap(returns => this.updateLocalReturns(returns)),
      catchError(err => {
        console.error('Error obteniendo devoluciones', err);
        return throwError(() => err);
      })
    );
  }

  getReturnById(id: number): Observable<ReturnsI> {
    return this.http.get<ReturnsI>(`${this.getUrl()}/${id}`, { headers: this.getHeaders() });
  }

  createReturn(returnObj: ReturnsI): Observable<ReturnsI> {
    return this.http.post<ReturnsI>(this.getUrl(), returnObj, { headers: this.getHeaders() }).pipe(
      tap(() => this.refreshReturns())
    );
  }

  updateReturn(returnObj: ReturnsI): Observable<ReturnsI> {
    return this.http.patch<ReturnsI>(`${this.getUrl()}/${returnObj.return_id}`, returnObj, { headers: this.getHeaders() }).pipe(
      tap(() => this.refreshReturns())
    );
  }

  deleteReturn(id: number): Observable<void> {
    return this.http.delete<void>(`${this.getUrl()}/${id}`, { headers: this.getHeaders() }).pipe(
      tap(() => this.refreshReturns())
    );
  }

  deleteReturnLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.getUrl()}/${id}/logic`, { headers: this.getHeaders() }).pipe(
      tap(() => this.refreshReturns())
    );
  }

  updateLocalReturns(returns: ReturnsI[]): void {
    this.returnsSubject.next(returns);
  }

  refreshReturns(): void {
    this.getAllReturns().subscribe();
  }
}
