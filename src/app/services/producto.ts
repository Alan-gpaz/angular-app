
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Producto as ModeloProducto,
  ProductInput
} from '../models/producto.models';

@Injectable({
  providedIn: 'root'
})
export class Producto {

  private http = inject(HttpClient);

  private url = 'https://fakestoreapi.com/products';

  // Obtener productos
  obtenerProducto(): Observable<ModeloProducto[]> {
    return this.http.get<ModeloProducto[]>(this.url);
  }

  // Obtener categorías
  obtenerCategorias(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/categories`);
  }

  // Crear producto
  crearProducto(producto: ProductInput): Observable<ModeloProducto> {
    return this.http.post<ModeloProducto>(this.url, producto);
  }

  // Actualizar producto
  actualizarProducto(
    id: number,
    producto: ProductInput
  ): Observable<ModeloProducto> {
    return this.http.put<ModeloProducto>(
      `${this.url}/${id}`,
      producto
    );
  }

  // Eliminar producto
  eliminarProducto(id: number): Observable<ModeloProducto> {
    return this.http.delete<ModeloProducto>(
      `${this.url}/${id}`
    );
  }
}
