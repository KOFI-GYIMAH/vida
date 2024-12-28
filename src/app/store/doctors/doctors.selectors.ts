import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DoctorsState } from './doctors.reducer';

export const selectDoctorsState =
  createFeatureSelector<DoctorsState>('doctors');

// * All Doctors
export const selectDoctorsLoading = createSelector(
  selectDoctorsState,
  (state) => state.loading
);
export const selectDoctors = createSelector(
  selectDoctorsState,
  (state) => state.doctors || []
);
