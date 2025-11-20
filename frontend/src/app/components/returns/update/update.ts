/**
 * Archivo: update.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para actualizar una devolución (Returns) usando Reactive Forms y TailwindCSS.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReturnsService } from '../../../services/returns';
import { ReturnsI } from '../../../models/returns';

@Component({
  selector: 'app-returns-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class ReturnsUpdate implements OnInit {
  returnForm: FormGroup;
  returnId!: number;

  constructor(
    private fb: FormBuilder,
    private returnsService: ReturnsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.returnForm = this.fb.group({
      contract_id: ['', Validators.required],
      date: ['', Validators.required],
      item_condition: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.returnId = Number(this.route.snapshot.paramMap.get('id'));
    this.returnsService.getReturnById(this.returnId).subscribe(ret => {
      if (ret) {
        this.returnForm.patchValue(ret);
      }
    });
  }

  onSubmit() {
    if (this.returnForm.valid) {
      const updatedReturn: ReturnsI = {
        return_id: this.returnId,
        ...this.returnForm.value
      };

      this.returnsService.updateReturn(updatedReturn).subscribe({
        next: () => {
          this.returnsService.refreshReturns();
          this.router.navigate(['/returns/getall']);
        }
      });
    }
  }
}
