import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { userReducer, type UserState } from './user/user.reducer';
import { patientsReducer, type PatientsState } from './patients/patients.reducer';
import { doctorsReducer, type DoctorsState } from './doctors/doctors.reducer';

// * Export state interface
export interface AppState {
  user: UserState;
  patients: PatientsState;
  doctors: DoctorsState;
}

// * Export reducers
export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  patients: patientsReducer,
  doctors: doctorsReducer
};

// * Export effects
export { PatientsEffect } from './patients/patients.effects';
export { DoctorsEffect } from './doctors/doctors.effects';

export const metaReducers: MetaReducer<AppState>[] = !isDevMode() ? [] : [];
