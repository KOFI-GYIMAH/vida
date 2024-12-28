import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DoctorsService } from '@services/doctors.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { selectDoctors } from './doctors.selectors';
import type { DoctorRecordResponse } from '@shared/models';

import * as DoctorsActions from './doctors.actions';

@Injectable()
export class DoctorsEffect {
  constructor(
    private actions$: Actions,
    private doctorsService: DoctorsService,
    private store: Store
  ) {}

  loadDoctors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorsActions.loadDoctors),
      withLatestFrom(this.store.select(selectDoctors)),
      switchMap(([action, doctors]) => {
        if (doctors && doctors.length > 0) {
          return of(DoctorsActions.retainDoctors());
        } else {
          return this.doctorsService.getDoctors().pipe(
            map((doctors: DoctorRecordResponse) =>
              DoctorsActions.loadDoctorsSuccess({ doctors })
            ),
            catchError((error) =>
              of(DoctorsActions.loadDoctorsFailure({ error }))
            )
          );
        }
      })
    )
  );
}
