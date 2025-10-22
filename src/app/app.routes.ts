import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ShellComponent } from './presentation/layout/shell.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./presentation/pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/login/login.component').then(m => m.LoginComponent),
  },
  { path: '**', redirectTo: '' },
];