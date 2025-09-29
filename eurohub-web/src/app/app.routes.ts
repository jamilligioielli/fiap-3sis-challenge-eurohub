import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), title: 'Dashboard | EuroHub' },
  { path: 'projetos', loadComponent: () => import('./pages/project-list/project-list.component').then(m => m.ProjectListComponent), title: 'Projetos | EuroHub' },
  { path: 'projeto/novo', loadComponent: () => import('./pages/create-project/create-project.component').then(m => m.CreateProjectComponent), title: 'Novo Projeto | EuroHub' },
  { path: 'projeto/:id', loadComponent: () => import('./pages/project-details/project-details.component').then(m => m.ProjectDetailsComponent), title: 'Detalhes Projeto | EuroHub' },
  { path: '**', redirectTo: '/dashboard' }
];
