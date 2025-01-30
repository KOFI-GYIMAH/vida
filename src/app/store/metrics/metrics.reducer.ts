import { createReducer, on } from '@ngrx/store';
import { AdminMetrics, DoctorMetrics } from '@shared/models';

import * as metricsActions from './metrics.actions';

export interface MetricsState {
  doctorMetrics: DoctorMetrics;
  loading: boolean;
  error: any;

  adminMetrics: AdminMetrics;
}

export const initialState: MetricsState = {
  doctorMetrics: {} as DoctorMetrics,
  loading: false,
  error: null,

  adminMetrics: {} as AdminMetrics,
};

export const metricsReducer = createReducer(
  initialState,

  // *  Doctor Metrics
  on(metricsActions.loadDoctorMetrics, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(metricsActions.loadDoctorMetricsSuccess, (state, { metrics }) => ({
    ...state,
    doctorMetrics: metrics,
    error: null,
    loading: false,
  })),
  on(metricsActions.loadDoctorMetricsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(metricsActions.retainDoctorMetrics, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),

  // * Admin Metrics
  on(metricsActions.loadAdminMetrics, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(metricsActions.loadAdminMetricsSuccess, (state, { metrics }) => ({
    ...state,
    adminMetrics: metrics,
    error: null,
    loading: false,
  })),
  on(metricsActions.loadAdminMetricsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(metricsActions.retainDoctorMetrics, (state) => ({
    ...state,
    loading: false,
    error: null,
  }))
);
