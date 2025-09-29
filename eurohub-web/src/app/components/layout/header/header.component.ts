import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ButtonModule, InputTextModule, BadgeModule, AvatarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();

  searchQuery = '';

  toggleSidebar() { this.sidebarToggle.emit(); }
  onSearch() { this.search.emit(this.searchQuery); }
}
