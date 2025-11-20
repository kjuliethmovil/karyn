/**
 * Archivo: create-provider.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-11-19
 * Descripción: Componente para crear un proveedor con Reactive Forms, usando el modelo ProviderI.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProviderService } from '../../../services/provider';
import { ProviderI } from '../../../models/provider';

@Component({
  selector: 'app-create-provider',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class ProviderCreate {
  form: FormGroup;
  statusOptions = ['ACTIVE', 'INACTIVE'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private providerService: ProviderService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact_person: ['', Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
  if (this.form.valid) {
    const provider: ProviderI = this.form.value;
    this.providerService.createProvider(provider).subscribe({
      next: () => this.router.navigate(['/proveedores']),
      error: err => console.error('Error creating provider:', err)
    });
  }
}


  cancelar() {
    this.router.navigate(['/proveedores']);
  }
}
