/**
 * Archivo: update.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para actualizar una garantía (Warranty) usando Reactive Forms y TailwindCSS.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { WarrantyService } from '../../../services/warranty';
import { WarrantyI } from '../../../models/warranty';

@Component({
  selector: 'app-warranty-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class WarrantyUpdate implements OnInit {
  warrantyForm: FormGroup;
  warrantyId!: number;

  constructor(
    private fb: FormBuilder,
    private warrantyService: WarrantyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.warrantyForm = this.fb.group({
      contract_id: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.warrantyId = Number(this.route.snapshot.paramMap.get('id'));
    const warranty = this.warrantyService.getWarranties().find(w => w.warranty_id === this.warrantyId);

    if (warranty) {
      this.warrantyForm.patchValue(warranty);
    }
  }

  onSubmit() {
    if (this.warrantyForm.valid) {
      const updatedWarranty: WarrantyI = {
        warranty_id: this.warrantyId,
        ...this.warrantyForm.value
      };

      this.warrantyService.updateWarranty(updatedWarranty);
      this.router.navigate(['/warranty/getall']);
    }
  }
}
