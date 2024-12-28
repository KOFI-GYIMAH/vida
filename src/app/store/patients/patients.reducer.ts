import { createReducer, on } from '@ngrx/store';
import { PatientRecord } from '@shared/models';

import * as patientsActions from './patients.actions';

export interface PatientsState {
  patients: PatientRecord[];
  loading: boolean;
  error: any;
  submitSuccess: boolean;
}

export const initialState: PatientsState = {
  patients: [],
  loading: false,
  error: null,
  submitSuccess: false,
};

export const patientsReducer = createReducer(
  initialState,

  // *  All Patients
  on(patientsActions.loadPatients, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(patientsActions.loadPatientsSuccess, (state, { patients }) => ({
    ...state,
    patients: patients.data,
    error: null,
    loading: false,
  })),
  on(patientsActions.loadPatientsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(patientsActions.retainPatients, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),

  // * Add Patient
  on(patientsActions.addPatient, (state) => ({
    ...state,
    loading: true,
    error: null,
    submitSuccess: false,
  })),
  on(patientsActions.addPatientSuccess, (state, { patient }) => ({
    ...state,
    patients: [patient.data, ...state.patients],
    error: null,
    loading: false,
    submitSuccess: true,
  })),
  on(patientsActions.addPatientFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
    submitSuccess: false,
  }))
);
