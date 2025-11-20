/**
 * Archivo: contract.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar contratos (ContractI) con datos simulados en memoria.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { ContractI} from '../models/contract';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private baseUrl = 'http://localhost:4000/api/contracts';
  private contractsSubject = new BehaviorSubject<ContractI[]>([]);
  public contracts$ = this.contractsSubject.asObservable();

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


  getAllContracts(): Observable<ContractI[]> {
    return this.http.get<ContractI[]>(this.baseUrl, { headers: this.getHeaders() })
    // .pipe(
    //   tap(response => {
    //       // console.log('Fetched contracts:', response);
    //     })
    // )
    ;
  }

  getContractById(id: number): Observable<ContractI> {
    return this.http.get<ContractI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createContract(contract: ContractI): Observable<ContractI> {
    return this.http.post<ContractI>(this.baseUrl, contract, { headers: this.getHeaders() });
  }

  updateContract( contract: ContractI): Observable<ContractI> {
    return this.http.patch<ContractI>(`${this.baseUrl}/${contract.contract_id}`, contract, { headers: this.getHeaders() });
  }

  deleteContract(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteContractLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  // Método para actualizar el estado local de contractes
  updateLocalContracts(contracts: ContractI[]): void {
    this.contractsSubject.next(contracts);
  }

  refreshContracts(): void {
    this.getAllContracts().subscribe(contracts => {
      this.contractsSubject.next(contracts);
    });
  }
}