import { Routes } from '@angular/router';
import { Cortes } from './pages/cortes/cortes';
import { Talleres } from './pages/talleres/talleres';
import { Asignaciones } from './pages/asignaciones/asignaciones';

export const routes: Routes = [
  {
    path: 'cortes',
    component: Cortes
  },
  {
    path: 'talleres',
    component: Talleres
  },
  {
    path: 'asignaciones',
    component: Asignaciones
  },
  {
    path: '',
    redirectTo: 'cortes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'cortes'
  }
];
