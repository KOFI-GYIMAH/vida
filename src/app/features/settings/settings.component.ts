import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '@shared/models';
import { selectUserRecord } from '@store/user';
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
  updateProfileForm!: FormGroup;
  user!: User;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.updateProfileForm = new FormGroup({
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
      licenceId: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ])
    });

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
}
