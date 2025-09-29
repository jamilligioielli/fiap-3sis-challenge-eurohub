import { Injectable, signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Project, ProjectStats } from '../models/project.interface';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private _projects = signal<Project[]>([]);
  private _loading = signal<boolean>(false);

  readonly projects = this._projects.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly stats = computed<ProjectStats>(() => {
    const projects = this._projects();
    return {
      total: projects.length,
      active: projects.filter(p => p.status === 'Em andamento').length,
      completed: projects.filter(p => p.status === 'Concluído').length,
      paused: projects.filter(p => p.status === 'Pausado').length,
      cancelled: projects.filter(p => p.status === 'Cancelado').length,
      overdue: projects.filter(p => new Date(p.deliveryDate) < new Date() && p.status !== 'Concluído').length,
      totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
      spentBudget: projects.reduce((sum, p) => sum + (p.cost || 0), 0)
    };
  });

  readonly recentProjects = computed(() =>
    this._projects()
      .sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
      .slice(0, 6)
  );

  constructor() { this.loadMockData(); }

  private loadMockData() {
    const mockProjects: Project[] = require('../mocks/projects-data.json');
    this._projects.set(mockProjects);
  }

  getProjects(): Observable<Project[]> {
    this._loading.set(true);
    return of(this._projects()).pipe(delay(300), tap(() => this._loading.set(false)));
  }

  getProjectById(id: number): Observable<Project | null> {
    return of(this._projects().find(p => p.id === id) || null).pipe(delay(200));
  }

  createProject(project: Partial<Project>): Observable<Project> {
    const newProject: Project = {
      id: Math.max(...this._projects().map(p => p.id)) + 1,
      name: project.name || '',
      description: project.description || '',
      objective: project.objective || '',
      category: project.category || 'Tecnologia',
      status: 'Em andamento',
      progress: 0,
      createdDate: new Date().toISOString().split('T')[0],
      deliveryDate: project.deliveryDate || '',
      lastUpdate: new Date().toISOString().split('T')[0],
      members: [],
      activities: [{ id: 1, description: 'Projeto criado', date: new Date().toISOString(), user: 'Usuário', type: 'created' }]
    };

    return of(newProject).pipe(
      delay(500),
      tap(p => this._projects.update(projects => [...projects, p]))
    );
  }

  deleteProject(id: number): Observable<boolean> {
    return of(true).pipe(
      delay(200),
      tap(() => this._projects.update(projects => projects.filter(p => p.id !== id)))
    );
  }
}
