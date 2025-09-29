import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { AvatarModule } from 'primeng/avatar';
import { Project } from '../../../models/project.interface';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, BadgeModule, TagModule, ProgressBarModule, AvatarModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() project!: Project;

  getBadgeClass(): string {
    switch (this.project.status) {
      case 'Em andamento': return 'p-badge-success';
      case 'Concluído': return 'p-badge-info';
      case 'Pausado': return 'p-badge-warning';
      case 'Cancelado': return 'p-badge-danger';
      default: return '';
    }
  }

  getCategoryStyle(): any {
    const colors: { [key: string]: string } = {
      'Tecnologia': '#0066CC', 'Marketing': '#28A745', 'Qualidade': '#20C997',
      'Recursos Humanos': '#FFC107', 'Financeiro': '#DC3545'
    };
    return { 'background-color': colors[this.project.category] || '#6c757d' };
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    return date.toLocaleDateString('pt-BR');
  }
}
