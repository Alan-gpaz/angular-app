
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto as ProductoServicio } from '../../services/producto';
import { Producto, ProductInput } from '../../models/producto.models';

@Component({
  selector: 'app-panel',
  imports: [FormsModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class Panel implements OnInit {

  productos = signal<Producto[]>([]);
  categorias = signal<string[]>([]);
  editingId = signal<number | null>(null);

  private servicio = inject(ProductoServicio);

  form: ProductInput = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  };

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  // Consultar productos
  cargarProductos(): void {
    this.servicio.obtenerProducto().subscribe({
      next: (datos) => {
        this.productos.set(datos);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  // Consultar categorías
  cargarCategorias(): void {
    this.servicio.obtenerCategorias().subscribe({
      next: (datos) => {
        this.categorias.set(datos);
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  // Guardar producto
  save(): void {
    if (
      !this.form.title.trim() ||
      !this.form.category ||
      !this.form.image.trim() ||
      this.form.price <= 0
    ) {
      return;
    }

    const id = this.editingId();

    if (id === null) {
      this.create();
    } else {
      this.update(id);
    }
  }

  // Crear producto
  private create(): void {
    this.servicio.crearProducto(this.form).subscribe({
      next: (producto) => {
        this.productos.update(lista => [
          producto,
          ...lista
        ]);

        this.cancel();
        alert('Producto creado correctamente');
      },
      error: (error) => {
        console.error('Error al crear:', error);
      }
    });
  }

  // Actualizar producto
  private update(id: number): void {
    this.servicio.actualizarProducto(id, this.form).subscribe({
      next: (producto) => {
        this.productos.update(lista =>
          lista.map(item =>
            item.id === id
              ? { ...item, ...producto }
              : item
          )
        );

        this.cancel();
        alert('Producto actualizado correctamente');
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
      }
    });
  }

  // Seleccionar producto para editar
  edit(producto: Producto): void {
    this.editingId.set(producto.id);

    this.form = {
      title: producto.title,
      price: producto.price,
      description: producto.description,
      category: producto.category,
      image: producto.image
    };
  }

  // Eliminar producto
  borrarProducto(id: number): void {
    if (!confirm('¿Deseas eliminar este producto?')) {
      return;
    }

    this.servicio.eliminarProducto(id).subscribe({
      next: () => {
        this.productos.update(lista =>
          lista.filter(producto => producto.id !== id)
        );

        alert('Producto eliminado correctamente');
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
      }
    });
  }

  // Limpiar formulario
  cancel(): void {
    this.editingId.set(null);

    this.form = {
      title: '',
      price: 0,
      description: '',
      category: '',
      image: ''
    };
  }
}
