import { Component, inject, OnInit, signal } from '@angular/core';
import { Producto as ProductoServicio } from '../../services/producto';
import { Producto } from '../../models/producto.models';

@Component({
  imports: [],
  selector: 'app-productos',
  styleUrl: './productos.css',
  templateUrl: './productos.html',
})
export class Productos implements OnInit {
  [x: string]: any;
  getProducto() {
    throw new Error('Method not implemented.');
  }
  productos = signal<Producto[]>([]);
  

  private servicio = inject(ProductoServicio);

  ngOnInit(): void {
    //Ejecutarse cuando se inicia el componente 
    this.servicio.obtenerProducto().subscribe({
      next: (dato) => {
        this.productos.set(dato);
        console.log(this.productos());
      },
  
    });
  }
}