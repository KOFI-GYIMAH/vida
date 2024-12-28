import { createReducer, on } from '@ngrx/store';
import { DoctorMetrics } from '@shared/models';

import * as metricsActions from './metrics.actions';

export interface MetricsState {
  doctorMetrics: DoctorMetrics;
  loading: boolean;
  error: any;
}

export const initialState: MetricsState = {
  doctorMetrics: {} as DoctorMetrics,
  loading: false,
  error: null,
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
  }))
);
