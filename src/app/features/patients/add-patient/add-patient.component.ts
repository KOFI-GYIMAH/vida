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

interface DiabeticStatus {
  name: string;
  value: string;
}

const DiabeticStatus: DiabeticStatus[] = [
  { name: 'Yes', value: 'Yes' },
  { name: 'No', value: 'No' },
];

// const DiabetesTypes = [
//   { name: 'Type 1', value: 'Type 1' },
//   { name: 'Type 2', value: 'Type 2' },
//   { name: 'Prediabetes', value: 'Prediabetes' },
//   { name: 'Monogenic', value: 'Monogenic' },
//   { name: 'Secondary', value: 'Secondary' },
// ];

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
  genderOptions: Gender[] = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'Other', value: 'Other' },
  ];
  diabeticStatusOptions: DiabeticStatus[] = DiabeticStatus;
  diabeticStatus: boolean = false;

  DiabetesTypes = [
    { name: 'Type 1', value: 'Type 1' },
    { name: 'Type 2', value: 'Type 2' },
    { name: 'Prediabetes', value: 'Prediabetes' },
    { name: 'Monogenic', value: 'Monogenic' },
    { name: 'Secondary', value: 'Secondary' },
  ];

  addPatientForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    middleName: new FormControl<string>(''),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    dob: new FormControl<Date | null>(null, [Validators.required]),
    gender: new FormControl<string>('', [Validators.required]),
    phoneNumber: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    insuranceProvider: new FormControl<string>(''),
    insuranceNumber: new FormControl<string>(''),
    insuranceStartDate: new FormControl<string>(''),
    insuranceEndDate: new FormControl<string>(''),
    diabeticStatus: new FormControl<DiabeticStatus | null>(null),
    diabeticType: new FormControl<DiabeticStatus | null>(null),
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
    this.addPatientForm
      .get('diabeticStatus')
      ?.valueChanges.subscribe((status) => {
        this.diabeticStatus = status?.value === 'Yes';
      });
  }

  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  previousStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  onSubmit() {
    // if (this.addPatientForm.invalid) return;

    const formValue = this.addPatientForm.value;
    const payload = {
      ...formValue,
      gender: formValue.gender?.value,
      diabeticStatus: formValue.diabeticStatus?.value,
      diabeticType: formValue.diabeticType?.value,
      dob: formValue.dob?.toISOString()?.split('T')[0],
    };
    console.log(payload);

    // this.store.dispatch(addPatient({ patient: payload }));
  }
}
