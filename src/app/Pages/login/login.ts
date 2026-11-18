
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html'
})
export class Login {

  private servicio = inject(Auth);
  private router = inject(Router);

  loading = signal(false);
  error = signal('');

  login = new FormGroup({
    usuario: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    contrasena: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  invalido(nombre: string): boolean {
    const control = this.login.get(nombre);
    return !!control && control.touched && control.invalid;
  }

  envio(): void {

    if (this.login.invalid) {
      this.login.markAllAsTouched();
      return;
    }

    const { usuario, contrasena } = this.login.getRawValue();

    const username = usuario ?? '';
    const password = contrasena ?? '';

    this.loading.set(true);
    this.error.set('');

    this.servicio.login(username, password).subscribe({
      next: () => {
        this.loading.set(false);

        if (this.servicio.isAdmin()) {
          this.router.navigate(['/panel']);
        } else {
          this.router.navigate(['/productos']);
        }
      },

      error: (error) => {
        this.loading.set(false);

        this.error.set(
          error.status === 401
            ? 'Usuario o contraseña incorrectos'
            : 'No se puede conectar con el servidor'
        );
      }
    });
  }
}
