import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { ClientService } from '../../../services/client';
import { ClientI } from '../../../models/client';


@Component({
  selector: 'app-update-clients',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './update.html',
  styleUrls: ['./update.css'],
  providers: [MessageService]
})
export class UpdateClients implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  clientId: number = 0;

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      status: ['ACTIVE', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clientId = parseInt(id);
      this.loadClient();
    }
  }

  // =======================================================
  // 🔹 Cargar cliente
  // =======================================================
  loadClient(): void {
    this.loading = true;
    this.clientService.getClientById(this.clientId).subscribe({
      next: (response: any) => {
        const client: ClientI = response.client ?? response;

        this.form.patchValue({
          name: client.name,
          address: client.address,
          phone: client.phone,
          email: client.email,
          password: '', // Por seguridad no cargamos la contraseña
          status: client.status
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar cliente:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la información del cliente'
        });
        this.loading = false;
      }
    });
  }

  // =======================================================
  // 🔹 GUARDAR
  // =======================================================
  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      const value = this.form.value;

      this.clientService.updateClient(this.clientId, {
        name: value.name,
        address: value.address,
        phone: value.phone,
        email: value.email,
        password: value.password || undefined,
        status: value.status
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Cliente actualizado correctamente'
          });

          setTimeout(() => {
            this.router.navigate(['/clientes']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error al actualizar cliente:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el cliente'
          });
          this.loading = false;
        }
      });

    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor complete todos los campos requeridos'
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/clientes']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['email']) return `Email inválido`;
    }
    return '';
  }
}
