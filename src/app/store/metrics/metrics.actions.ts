import { createAction, props } from '@ngrx/store';
import { AdminMetrics, DoctorMetrics } from '@shared/models';

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

// * Admin Metrics
export const loadAdminMetrics = createAction('[Metrics] Load Admin Metrics');
export const loadAdminMetricsSuccess = createAction(
  '[Metrics] Load Admin Metrics Success',
  props<{ metrics: AdminMetrics }>()
);
export const loadAdminMetricsFailure = createAction(
  '[Metrics] Load Admin Metrics Failure',
  props<{ error: any }>()
);
export const retainAdminMetrics = createAction(
  '[Metrics] Retain Admin Metrics'
);
