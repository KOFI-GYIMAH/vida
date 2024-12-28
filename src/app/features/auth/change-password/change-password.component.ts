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
import { PasswordModule } from 'primeng/password';
import { passwordMatchValidator } from '../../../utils';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    RouterLink,
    PasswordModule,
    CommonModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent implements OnInit {
  loading: boolean = false;
  changePasswordForm!: FormGroup;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.changePasswordForm = new FormGroup(
      {
        password: new FormControl<string>('', [
          Validators.required,
          Validators.min(8),
        ]),
        confirm_password: new FormControl<string>('', Validators.required),
      },
      { validators: passwordMatchValidator }
    );
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) return;
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Password changed successful',
      });
      this.router.navigate(['/login']);
    }, 3000);

    // this.authService.changePassword(this.changePasswordForm.value).subscribe({
    //   next: (res) => {
    //     this.loading = false;
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Success',
    //       detail: 'Password changed successful',
    //     });
    //     this.router.navigate(['/login']);
    //   },
    //   error: (err) => {
    //     this.loading = false;
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'Oops, something went wrong.',
    //     });
    //   },
    // });
  }
}
