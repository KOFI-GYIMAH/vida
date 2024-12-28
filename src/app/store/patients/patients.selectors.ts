import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientsState } from './patients.reducer';

export const selectPatientsState =
  createFeatureSelector<PatientsState>('patients');

// * All Patients
export const selectPatientsLoading = createSelector(
  selectPatientsState,
  (state) => state.loading
);
export const selectPatients = createSelector(
  selectPatientsState,
  (state) => state.patients || []
);
export const selectSubmitSuccess = createSelector(
  selectPatientsState,
  (state) => state.submitSuccess
);
