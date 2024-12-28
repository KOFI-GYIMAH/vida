import { LocalStorageService } from './../../../core/services/local-storage.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { loadUserRecordSuccess } from '@store/user';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('borlor@andurar.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>('password', [Validators.required]),
  });

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store: Store
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.localStorageService.setItem('token', res.data.accessToken);
        this.localStorageService.setItem('user', res.data);

        this.store.dispatch(loadUserRecordSuccess({ user: res.data }));

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful',
        });
        this.router.navigate(['/overview']);
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid email or password. Please try again.',
        });
      },
    });
  }
}
