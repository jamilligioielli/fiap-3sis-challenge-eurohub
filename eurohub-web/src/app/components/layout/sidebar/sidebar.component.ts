import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarModule, ButtonModule, RippleModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() visible = true;
  @Output() visibilityChange = new EventEmitter<boolean>();

  menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Meus Projetos', icon: 'pi pi-folder', route: '/projetos', badge: 3},
    { label: 'Novo Projeto', icon: 'pi pi-plus-circle', route: '/projeto/novo' }
  ];

  get sidebarVisible() { return this.visible; }
  set sidebarVisible(value: boolean) { this.visibilityChange.emit(value); }
  onHide() { this.visibilityChange.emit(false); }
}
