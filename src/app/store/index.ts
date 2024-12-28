import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { doctorsReducer, type DoctorsState } from './doctors/doctors.reducer';
import { metricsReducer, type MetricsState } from './metrics/metrics.reducer';
import {
  patientsReducer,
  type PatientsState,
} from './patients/patients.reducer';
import { userReducer, type UserState } from './user/user.reducer';

// * Export state interface
export interface AppState {
  user: UserState;
  patients: PatientsState;
  doctors: DoctorsState;
  metrics: MetricsState;
}

// * Export reducers
export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  patients: patientsReducer,
  doctors: doctorsReducer,
  metrics: metricsReducer,
};

// * Export effects
export { DoctorsEffect } from './doctors/doctors.effects';
export { MetricsEffect } from './metrics/metrics.effects';
export { PatientsEffect } from './patients/patients.effects';

export const metaReducers: MetaReducer<AppState>[] = !isDevMode() ? [] : [];
