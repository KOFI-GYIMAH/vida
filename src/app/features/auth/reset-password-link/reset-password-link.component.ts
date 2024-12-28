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

@Component({
  selector: 'app-reset-password-link',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, RouterLink],
  templateUrl: './reset-password-link.component.html',
  styleUrl: './reset-password-link.component.css',
})
export class ResetPasswordLinkComponent implements OnInit {
  loading: boolean = false;
  resetPasswordForm!: FormGroup;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) return;
    this.loading = true;

    this.authService.resetPasswordLink(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Reset link sent successful',
        });
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Oops, something went wrong.',
        });
      },
    });
  }
}
