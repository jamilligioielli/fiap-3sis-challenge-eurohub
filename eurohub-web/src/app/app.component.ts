import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from './components/layout/header/header.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private router: Router, private messageService: MessageService) { }

  sidebarVisible = signal(true);

  toggleSidebar() { this.sidebarVisible.update(v => !v); }
  onSidebarVisibilityChange(visible: boolean) { this.sidebarVisible.set(visible); }
  onSearch(query: string) {
    if (query.trim()) {
      this.router.navigate(['/projetos'], { queryParams: { q: query } });
      this.messageService.add({ severity: 'info', summary: 'Busca', detail: `Buscando: "${query}"`, life: 3000 });
    }
  }
}
