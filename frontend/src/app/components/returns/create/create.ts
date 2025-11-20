/**
 * Archivo: create.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para registrar una nueva devolución (Returns) usando Reactive Forms y TailwindCSS.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReturnsService } from '../../../services/returns';
import { ReturnsI } from '../../../models/returns';

@Component({
  selector: 'app-returns-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class ReturnsCreate {
  returnForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private returnsService: ReturnsService,
    private router: Router
  ) {
    this.returnForm = this.fb.group({
      contract_id: ['', Validators.required],
      date: ['', Validators.required],
      item_condition: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.returnForm.valid) {
      const newReturn: ReturnsI = this.returnForm.value;
      this.returnsService.createReturn(newReturn).subscribe({
        next: () => {
          this.returnsService.refreshReturns();
          this.router.navigate(['/returns/getall']);
        }
      });
    }
  }
}
