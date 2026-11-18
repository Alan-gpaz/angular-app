
import { Routes } from '@angular/router';

import { Productos } from './Pages/productos/productos';
import { Login } from './Pages/login/login';
import { Panel } from './Pages/panel/panel';

import { Usuario } from './usuario/usuario';
import { Admin } from './admin/admin';

import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  { path: 'productos', component: Productos },

  {
    path: 'usuario',
    component: Usuario,
    canActivate: [authGuard]
  },

  {
    path: 'admin',
    component: Admin,
    canActivate: [adminGuard]
  },

  {
    path: 'panel',
    component: Panel,
    canActivate: [adminGuard]
  },

  { path: '**', redirectTo: 'login' }
];
