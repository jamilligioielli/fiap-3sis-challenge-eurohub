import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ProjectService } from '../../services/project.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputTextareaModule, DropdownModule, CalendarModule, CardModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectService: ProjectService,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}

  projectForm!: FormGroup;
  loading = signal(false);
  categories = signal<any[]>([]);

  categoryOptions = computed(() => this.categories().map(cat => ({ label: cat.name, value: cat.name })));

  ngOnInit() {
    this.initForm();
    this.loadData();
  }

  private initForm() {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      objective: ['', Validators.required],
      category: ['Tecnologia'],
      deliveryDate: [''],
      budget: [0],
    });
  }

  private loadData() {
    this.categoryService.getCategories().subscribe(categories => this.categories.set(categories));
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.loading.set(true);
      this.projectService.createProject(this.projectForm.value).subscribe({
        next: project => {
          this.loading.set(false);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Projeto criado com sucesso!' });
          this.router.navigate(['/projeto', project.id]);
        },
        error: () => {
          this.loading.set(false);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar projeto' });
        }
      });
    }
  }

  onCancel() { this.router.navigate(['/projetos']); }
}
