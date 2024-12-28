import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PatientsService } from '@services/patients.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { selectPatients } from './patients.selectors';

import type { PatientRecordResponse } from '@shared/models';
import * as patientsActions from './patients.actions';

@Injectable()
export class PatientsEffect {
  constructor(
    private actions$: Actions,
    private patientsService: PatientsService,
    private store: Store,
    private messageService: MessageService
  ) {}

  loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(patientsActions.loadPatients),
      withLatestFrom(this.store.select(selectPatients)),
      switchMap(([action, patients]) => {
        if (patients && patients.length > 0) {
          return of(patientsActions.retainPatients());
        } else {
          return this.patientsService.getPatients().pipe(
            map((patients: PatientRecordResponse) =>
              patientsActions.loadPatientsSuccess({ patients })
            ),
            catchError((error) =>
              of(patientsActions.loadPatientsFailure({ error }))
            )
          );
        }
      })
    )
  );

  addPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(patientsActions.addPatient),
      switchMap((action) => {
        return this.patientsService.addPatient(action.patient).pipe(
          map((patient) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Patient added successfully',
              life: 3000,
            });
            return patientsActions.addPatientSuccess({ patient });
          }),
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to add patient',
              life: 3000,
            });
            return of(patientsActions.addPatientFailure({ error }));
          })
        );
      })
    )
  );
}
