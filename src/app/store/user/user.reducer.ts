import { createReducer, on } from '@ngrx/store';
import { User } from '@shared/models';
import { resetUserState } from '../user';

import * as UserActions from './user.actions';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: any;
  isAuthenticated: boolean;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const userReducer = createReducer(
  initialState,

  on(UserActions.loadUserRecord, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUserRecordSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    loading: false,
  })),
  on(UserActions.loadUserRecordFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(UserActions.retainUserRecord, (state) => ({
    ...state,
    loading: false,
  })),

  on(resetUserState, () => initialState)
);
