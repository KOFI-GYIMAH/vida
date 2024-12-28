import { createAction, props } from '@ngrx/store';
import { DoctorRecordResponse } from '@shared/models';

// * All Doctors
export const loadDoctors = createAction('[Doctors] Load Doctors');
export const loadDoctorsSuccess = createAction(
  '[Doctors] Load Doctors Success',
  props<{ doctors: DoctorRecordResponse }>()
);
export const loadDoctorsFailure = createAction(
  '[Doctors] Load Doctors Failure',
  props<{ error: any }>()
);
export const retainDoctors = createAction('[Doctors] Retain Doctors');
