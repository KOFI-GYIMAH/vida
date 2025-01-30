import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

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
    DropdownModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  loading: boolean = false;
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    middleName: new FormControl<string>(''),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    licenseId: new FormControl<string>('', [Validators.required]),
    phoneNumber: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.min(8),
    ]),
    roles: new FormControl<string>('', [Validators.required]),
  });

  currentStep: number = 1;
  rolesOptions = [
    { name: 'Optometrist', value: 'OPTOMETRIST' },
    { name: 'Specialist', value: 'SPECIALIST' },
    { name: 'General Practitioner', value: 'GENERAL_PRACTITIONER' },
    { name: 'Technician', value: 'TECHNICIAN' },
  ];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  nextStep() {
    if (this.currentStep < 2) this.currentStep++;
  }

  previousStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  onSubmit() {
    if (this.currentStep === 1 && this.registerForm.invalid) return;
    this.loading = true;

    const payload = {
      ...this.registerForm.value,
      roles: [this.registerForm.value.roles.value],
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.responseCode == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.responseMessage || 'Request submitted successfully',
            sticky: true,
          });
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Already registered',
        });
      },
    });
  }
}
