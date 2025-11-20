/**
 * Archivo: app.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente principal de la aplicación Rentool2
 */

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth';


// Importación de componentes de layout
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { Aside } from './components/layout/aside/aside';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Footer, Aside],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Rentool');
  showAside = signal(true);

  // Método para mostrar/ocultar el Aside
  toggleAside() {
    this.showAside.update(v => !v);

  }
  constructor(public authService: AuthService) {}
}
