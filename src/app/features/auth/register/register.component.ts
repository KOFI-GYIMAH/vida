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
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { passwordMatchValidator } from '../../../utils';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    PasswordModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        lastName: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        licenseId: new FormControl<string>('', [Validators.required]),
        phoneNumber: new FormControl<string>('', [Validators.required]),
        email: new FormControl<string>('', [
          Validators.required,
          Validators.email,
        ]),
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
    if (this.registerForm.invalid) return;
    this.loading = true;

    // setTimeout(() => {
    //   this.loading = false;
    //   this.messageService.add({
    //     severity: 'success',
    //     summary: 'Success',
    //     detail: 'Request submitted successfully',
    //     sticky: true,
    //   });
    //   this.router.navigate(['/']);
    // }, 3000);

    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Request submitted successfully',
           sticky: true,
        });
        this.router.navigate(['/']);
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
