import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserRecordState = createFeatureSelector<UserState>('user');

export const selectUserRecordLoading = createSelector(
  selectUserRecordState,
  (state) => state.loading
);
export const selectUserRecordError = createSelector(
  selectUserRecordState,
  (state) => state.error
);
export const selectUserRecord = createSelector(
  selectUserRecordState,
  (state) => state.user
);
export const selectIsAuthenticated = createSelector(
  selectUserRecordState,
  (state) => state.isAuthenticated
);