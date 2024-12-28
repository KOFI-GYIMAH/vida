import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  addPatient,
  selectPatientsLoading,
  selectSubmitSuccess,
} from '@store/patients';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';

interface Gender {
  name: string;
  value: string;
}

const GENDERS: Gender[] = [
  { name: 'Male', value: 'Male' },
  { name: 'Female', value: 'Female' },
  { name: 'Other', value: 'Other' },
];

interface DiabeticStatus {
  name: string;
  value: string;
}

const DiabeticStatus: DiabeticStatus[] = [
  { name: 'Yes', value: 'Yes' },
  { name: 'No', value: 'No' },
];

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    CommonModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputMaskModule,
  ],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css',
})
export class AddPatientComponent implements OnInit {
  loading: boolean = false;
  currentStep: number = 1;
  genderOptions: Gender[] = GENDERS;
  diabeticStatusOptions: DiabeticStatus[] = DiabeticStatus;

  addPatientForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    dob: new FormControl<Date | null>(null, [Validators.required]),
    gender: new FormControl<string>('', [Validators.required]),
    phoneNumber: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    insuranceProvider: new FormControl<string>(''),
    insuranceNumber: new FormControl<string>(''),
    insuranceStartDate: new FormControl<string>(''),
    insuranceEndDate: new FormControl<string>(''),
    diabeticStatus: new FormControl<string>(''),
    diabeticType: new FormControl<string>(''),
    diabeticDiagnoseDate: new FormControl<string>(''),
    currentRegimen: new FormControl<string>(''),
    diabeticFamilyHistory: new FormControl<string>(''),
    partEyeCondition: new FormControl<string>(''),
    partEyeConditionStatement: new FormControl<string>(''),
    otherMedicalConditions: new FormControl<string>(''),
  });

  constructor(private store: Store) {
    this.store.select(selectPatientsLoading).subscribe((loading) => {
      this.loading = loading;
    });

    this.store.select(selectSubmitSuccess).subscribe((success) => {
      if (success) {
        this.addPatientForm.reset();
        this.currentStep = 1;
      }
    });
  }

  ngOnInit() {
    this.addPatientForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      dob: new Date(1985, 6, 15),
      gender: { name: 'Male', value: 'Male' },
      phoneNumber: '0123456789',
      email: 'johndoe@example.com',
      insuranceProvider: 'HealthFirst',
      insuranceNumber: 'INS123456',
      insuranceStartDate: new Date(2021, 6, 15),
      insuranceEndDate: new Date(2024, 6, 15),
      diabeticStatus: { name: 'Yes', value: 'Yes' },
      diabeticType: 'Type 1',
      diabeticDiagnoseDate: new Date(2024, 6, 15),
      currentRegimen: 'Insulin Therapy',
      diabeticFamilyHistory: 'Yes',
      partEyeCondition: 'Diabetic Retinopathy',
      partEyeConditionStatement: 'Mild Non-Proliferative',
      otherMedicalConditions: 'Hypertension',
    });
  }

  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  previousStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  onSubmit() {
    if (this.addPatientForm.invalid) return;
    const payload = {
      ...this.addPatientForm.value,
      gender: this.addPatientForm.value.gender.value,
      diabeticStatus: this.addPatientForm.value.diabeticStatus.value,
    };
    console.log(payload);

    this.store.dispatch(addPatient({ patient: payload }));
  }
}
