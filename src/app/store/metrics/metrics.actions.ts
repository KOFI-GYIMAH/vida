import { createAction, props } from '@ngrx/store';
import { DoctorMetrics } from '@shared/models';

// * Doctor Metrics
export const loadDoctorMetrics = createAction('[Metrics] Load Doctor Metrics');
export const loadDoctorMetricsSuccess = createAction(
  '[Metrics] Load Doctor Metrics Success',
  props<{ metrics: DoctorMetrics }>()
);
export const loadDoctorMetricsFailure = createAction(
  '[Metrics] Load Doctor Metrics Failure',
  props<{ error: any }>()
);
export const retainDoctorMetrics = createAction(
  '[Metrics] Retain Doctor Metrics'
);
