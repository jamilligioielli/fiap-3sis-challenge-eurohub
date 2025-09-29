import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Member } from '../models/project.interface';

@Injectable({ providedIn: 'root' })
export class MemberService {
  private _members = signal<Member[]>([]);
  readonly members = this._members.asReadonly();

  constructor() { this.loadMockMembers(); }

  private loadMockMembers() {
    const mockMembers: Member[] = [
      { id: 1, name: 'João Silva', role: 'Gerente de Projeto', avatar: 'JS', email: 'joao@eurofarma.com', department: 'TI', isActive: true },
      { id: 2, name: 'Maria Santos', role: 'Desenvolvedora', avatar: 'MS', email: 'maria@eurofarma.com', department: 'TI', isActive: true },
      { id: 3, name: 'Ana Costa', role: 'Especialista Qualidade', avatar: 'AC', email: 'ana@eurofarma.com', department: 'Qualidade', isActive: true },
      { id: 4, name: 'Carlos Lima', role: 'Marketing Digital', avatar: 'CL', email: 'carlos@eurofarma.com', department: 'Marketing', isActive: true },
      { id: 5, name: 'Pedro Oliveira', role: 'Designer', avatar: 'PO', email: 'pedro@eurofarma.com', department: 'Design', isActive: true }
    ];
    this._members.set(mockMembers);
  }

  getMembers(): Observable<Member[]> {
    return of(this._members()).pipe(delay(200));
  }

  getMemberById(id: number): Observable<Member | undefined> {
    return of(this._members().find(m => m.id === id)).pipe(delay(100));
  }
}