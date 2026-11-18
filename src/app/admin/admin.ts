
import { Component, inject, OnInit, signal } from '@angular/core';
import { Producto as ProductoServicio } from '../services/producto';
import { Producto } from '../models/producto.models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {

  productos = signal<Producto[]>([]);

  private servicio = inject(ProductoServicio);

  ngOnInit(): void {
    this.servicio.obtenerProducto().subscribe({
      next: (datos) => {
        this.productos.set(datos);
      },
      error: (error) => {
        console.log('Error al obtener productos', error);
      }
    });
  }
}
