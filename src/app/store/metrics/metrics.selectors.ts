import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MetricsState } from './metrics.reducer';

export const selectMetricsState =
  createFeatureSelector<MetricsState>('metrics');

// * Doctor Metrics
export const selectDoctorMetricsLoading = createSelector(
  selectMetricsState,
  (state) => state.loading
);
export const selectDoctorMetrics = createSelector(
  selectMetricsState,
  (state) => state.doctorMetrics || {}
);

// * Admin Metrics
export const selectAdminMetrics = createSelector(
  selectMetricsState,
  (state) => state.adminMetrics || {}
);
