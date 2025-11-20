/**
 * Archivo: contract-detail.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar los detalles de contratos (ContractDetailI) con datos simulados en memoria.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { ContractDetailI } from '../models/contract-detail';
import { AuthService } from './auth';



@Injectable({
  providedIn: 'root'
})
export class ContractDetailService {
  private baseUrl = 'http://localhost:8000/api/contractdetails';
  private contractdetailsSubject = new BehaviorSubject<ContractDetailI[]>([]);
  public contractdetails$ = this.contractdetailsSubject.asObservable();

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


  getAllContractDetails(): Observable<ContractDetailI[]> {
    return this.http.get<ContractDetailI[]>(this.baseUrl, { headers: this.getHeaders() })
    // .pipe(
    //   tap(response => {
    //       // console.log('Fetched contractdetails:', response);
    //     })
    // )
    ;
  }

  getContractDetailById(id: number): Observable<ContractDetailI> {
    return this.http.get<ContractDetailI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createContractDetail(contractdetail: ContractDetailI): Observable<ContractDetailI> {
    return this.http.post<ContractDetailI>(this.baseUrl, contractdetail, { headers: this.getHeaders() });
  }

  updateContractDetail( contractdetail: ContractDetailI): Observable<ContractDetailI> {
    return this.http.patch<ContractDetailI>(`${this.baseUrl}/${contractdetail.contract_detail_id}`, contractdetail, { headers: this.getHeaders() });
  }

  deleteContractDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteContractDetailLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  // Método para actualizar el estado local de contractdetailes
  updateLocalContractDetails(contractdetails: ContractDetailI[]): void {
    this.contractdetailsSubject.next(contractdetails);
  }

  refreshContractDetails(): void {
    this.getAllContractDetails().subscribe((contractdetails: ContractDetailI[]) => {
      this.contractdetailsSubject.next(contractdetails);
    });
  }
}
