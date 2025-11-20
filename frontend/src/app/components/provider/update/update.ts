import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';

import { ProviderService } from '../../../services/provider';
import { ProviderI } from '../../../models/provider';


@Component({
  selector: 'app-update-providers',
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
export class UpdateProviders implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  providerId: number = 0;

  statuses = [
    { label: 'Activo', value: 'ACTIVE' },
    { label: 'Inactivo', value: 'INACTIVE' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private messageService: MessageService
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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.providerId = parseInt(id);
      this.loadProvider();
    }
  }

  // =======================================================
  // 🔹 Cargar proveedor
  // =======================================================
  loadProvider(): void {
    this.loading = true;
    this.providerService.getProviderById(this.providerId).subscribe({
      next: (response: any) => {
        const provider: ProviderI = response.provider ?? response;

        this.form.patchValue({
          name: provider.name,
          address: provider.address,
          phone: provider.phone,
          email: provider.email,
          contact_person: provider.contact_person,
          status: provider.status
        });

        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar proveedor:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la información del proveedor'
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

      this.providerService.updateProvider({
  id: this.providerId,
  name: value.name,
  address: value.address,
  phone: value.phone,
  email: value.email,
  contact_person: value.contact_person,
  status: value.status
}).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Proveedor actualizado correctamente'
          });

          setTimeout(() => {
            this.router.navigate(['/proveedores']);
          }, 1000);
        },
        error: (error) => {
          console.error('Error al actualizar proveedor:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el proveedor'
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
    this.router.navigate(['/proveedores']);
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
