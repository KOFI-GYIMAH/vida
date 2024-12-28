import { createAction, props } from '@ngrx/store';
import { User } from '@shared/models';

export const loadUserRecord = createAction('[User] Load User Record');
export const loadUserRecordSuccess = createAction(
  '[User] Load User Record Success',
  props<{ user: User }>()
);
export const loadUserRecordFailure = createAction(
  '[User] Load User Record Failure',
  props<{ error: any }>()
);
export const retainUserRecord = createAction('[User] Retain User Record');

export const resetUserState = createAction('[User] Reset User State');
