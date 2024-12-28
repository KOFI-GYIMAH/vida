import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/local-storage.service';
import { User } from '@shared/models';
import { loadUserRecordSuccess } from '@store/user';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ConfirmDialogModule,
    ButtonModule,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent implements OnInit {
  isSidebarOpen = false;
  openDropdowns: { [key: string]: boolean } = {
    patients: false,
    doctors: false,
  };

  user!: User;
  token!: string;

  constructor(
    private localStorageService: LocalStorageService,
    private store: Store,

    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.localStorageService.getItem('user');
    if (user) {
      this.store.dispatch(loadUserRecordSuccess({ user }));
      this.user = user;
    }

    const token = this.localStorageService.getItem('token');
    if (token) {
      this.token = token;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleDropdown(key: string) {
    this.openDropdowns[key] = !this.openDropdowns[key];
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.authService.logout();
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'You have been logged out successfully',
        });
      },
      reject: () => {},
    });
  }
}
