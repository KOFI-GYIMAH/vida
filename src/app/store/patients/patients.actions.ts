import { createAction, props } from '@ngrx/store';
import {
  PatientPayload,
  PatientRecordResponse,
  AddPatientResponse,
} from '@shared/models';

// * All Patients
export const loadPatients = createAction('[Patients] Load Patients');
export const loadPatientsSuccess = createAction(
  '[Patients] Load Patients Success',
  props<{ patients: PatientRecordResponse }>()
);
export const loadPatientsFailure = createAction(
  '[Patients] Load Patients Failure',
  props<{ error: any }>()
);
export const retainPatients = createAction('[Patients] Retain Patients');

// * Add Patient
export const addPatient = createAction(
  '[Patients] Add Patient',
  props<{ patient: PatientPayload }>()
);
export const addPatientSuccess = createAction(
  '[Patients] Add Patient Success',
  props<{ patient: AddPatientResponse }>()
);
export const addPatientFailure = createAction(
  '[Patients] Add Patient Failure',
  props<{ error: any }>()
);
