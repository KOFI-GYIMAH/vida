import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { DoctorsService } from '@services/doctors.service';
import { User } from '@shared/models';
import { selectUserRecord } from '@store/user';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [InputTextModule, CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  loading: boolean = false;

  updateProfileForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    middleName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl<string>({ value: '', disabled: true }),
    phoneNumber: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    licenceId: new FormControl<string>({ value: '', disabled: true }),
  });
  user!: User;

  constructor(
    private store: Store,
    private doctorsService: DoctorsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.store.select(selectUserRecord).subscribe((user: User | null) => {
      if (user) {
        this.user = user;
        this.updateProfileForm.patchValue({
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          licenceId: user.licenceId,
        });
      }
    });
  }

  updateProfile() {
    if (!this.updateProfileForm.valid) return;
    this.loading = true;

    const payload = {
      firstName: this.updateProfileForm.value.firstName,
      middleName: this.updateProfileForm.value.middleName,
      lastName: this.updateProfileForm.value.lastName,
      phoneNumber: this.updateProfileForm.value.phoneNumber,
    };

    this.doctorsService
      .updateDoctorProfile(this.user.userId, payload)
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Profile updated successful',
          });
          this.loading = false;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.responseMessage || 'Something went wrong',
          });
          this.loading = false;
        },
      });
  }
}
