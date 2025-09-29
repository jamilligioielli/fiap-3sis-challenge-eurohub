import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.interface';
import { ProjectCardComponent } from '../../components/shared/project-card/project-card.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, InputTextModule, ButtonModule, DropdownModule, ProjectCardComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private route : ActivatedRoute
  ) {}

  projects = signal<Project[]>([]);
  searchQuery = '';
  selectedStatus: string | null = null;
  selectedCategory: string | null = null;

  statusOptions = [
    { label: 'Em Andamento', value: 'Em andamento' },
    { label: 'Concluído', value: 'Concluído' },
    { label: 'Pausado', value: 'Pausado' },
    { label: 'Cancelado', value: 'Cancelado' }
  ];

  categoryOptions = [
    { label: 'Tecnologia', value: 'Tecnologia' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Qualidade', value: 'Qualidade' },
    { label: 'Recursos Humanos', value: 'Recursos Humanos' },
    { label: 'Financeiro', value: 'Financeiro' }
  ];

  filteredProjects = () => {
    return this.applyFilters();
  };

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => this.projects.set(projects));

    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery = params['q'];
      }
    });
  }

  applyFilters() {
    let filtered = [...this.projects()];

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query)
      );
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(project => project.status === this.selectedStatus);
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(project => project.category === this.selectedCategory);
    }

    return filtered;
  }

  onFilter() {
    this.filteredProjects = () => {
      return this.applyFilters();
    }
  }

  hasActiveFilters(): boolean {
    return !!(this.searchQuery.trim() || this.selectedStatus || this.selectedCategory);
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedStatus = null;
    this.selectedCategory = null;
  }
}
