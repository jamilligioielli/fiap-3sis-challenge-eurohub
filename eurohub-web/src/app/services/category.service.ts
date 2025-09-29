import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Category } from '../models/project.interface';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private _categories = signal<Category[]>([]);
  readonly categories = this._categories.asReadonly();

  constructor() { this.loadMockCategories(); }

  private loadMockCategories() {
    const mockCategories: Category[] = [
      { id: 1, name: 'Tecnologia', color: '#0066CC', icon: 'pi pi-desktop', description: 'Projetos de TI', isActive: true },
      { id: 2, name: 'Marketing', color: '#28A745', icon: 'pi pi-megaphone', description: 'Campanhas e promoções', isActive: true },
      { id: 3, name: 'Qualidade', color: '#20C997', icon: 'pi pi-verified', description: 'Controle de qualidade', isActive: true },
      { id: 4, name: 'Recursos Humanos', color: '#FFC107', icon: 'pi pi-users', description: 'Gestão de pessoas', isActive: true },
      { id: 5, name: 'Financeiro', color: '#DC3545', icon: 'pi pi-dollar', description: 'Projetos financeiros', isActive: true }
    ];
    this._categories.set(mockCategories);
  }

  getCategories(): Observable<Category[]> {
    return of(this._categories()).pipe(delay(150));
  }

  getCategoryByName(name: string): Observable<Category | undefined> {
    return of(this._categories().find(c => c.name === name)).pipe(delay(50));
  }
}