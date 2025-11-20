/**
 * Archivo: create-client.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-11-19
 * Descripción: Componente para crear un cliente con Reactive Forms, usando el modelo ClientI.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ClientService } from '../../../services/client';
import { ClientI } from '../../../models/client';


@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class CreateClient {
  form: FormGroup;
  statusOptions = ['ACTIVE', 'INACTIVE'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const client: ClientI = this.form.value;
      this.clientService.createClient(client).subscribe({
        next: () => this.router.navigate(['/clientes']),
        error: err => console.error('Error creating client:', err)
      });
    }
  }

  cancelar() {
    this.router.navigate(['/clients']);
  }
}
