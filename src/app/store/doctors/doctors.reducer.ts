import { createReducer, on } from '@ngrx/store';
import { DoctorRecord } from '@shared/models';

import * as DoctorsActions from './doctors.actions';

export interface DoctorsState {
  doctors: DoctorRecord[];
  loading: boolean;
  error: any;
}

export const initialState: DoctorsState = {
  doctors: [],
  loading: false,
  error: null,
};

export const doctorsReducer = createReducer(
  initialState,

  // *  All Doctors
  on(DoctorsActions.loadDoctors, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DoctorsActions.loadDoctorsSuccess, (state, { doctors }) => ({
    ...state,
    doctors: doctors.data,
    error: null,
    loading: false,
  })),
  on(DoctorsActions.loadDoctorsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(DoctorsActions.retainDoctors, (state) => ({
    ...state,
    loading: false,
    error: null,
  }))
);
