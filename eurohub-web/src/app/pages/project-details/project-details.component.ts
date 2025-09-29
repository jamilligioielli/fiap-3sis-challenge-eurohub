import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { AvatarModule } from 'primeng/avatar';
import { SkeletonModule } from 'primeng/skeleton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.interface';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, BadgeModule, TagModule, ProgressBarModule, AvatarModule, SkeletonModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  project = signal<Project | null>(null);

  ngOnInit() {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (projectId) { this.loadProject(projectId); }
  }

  private loadProject(id: number) {
    this.projectService.getProjectById(id).subscribe({
      next: project => this.project.set(project),
      error: () => this.router.navigate(['/projetos'])
    });
  }

  onEdit() { console.log('Edit project:', this.project()); }

  onDelete() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este projeto?',
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        const projectId = this.project()?.id;
        if (projectId) {
          this.projectService.deleteProject(projectId).subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Projeto excluído com sucesso!' });
              this.router.navigate(['/projetos']);
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir projeto' })
          });
        }
      }
    });
  }

  getBadgeClass(): string {
    const status = this.project()?.status;
    switch (status) {
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
    return { 'background-color': colors[this.project()?.category || ''] || '#6c757d' };
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR');
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }
}
