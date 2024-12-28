import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MetricsService } from '@services/metrics.service';
import { isEmptyObject } from '@utils/utils.utils';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { selectDoctorMetrics } from './metrics.selectors';

import type { DoctorMetrics } from '@shared/models';
import * as metricsActions from './metrics.actions';

@Injectable()
export class MetricsEffect {
  constructor(
    private actions$: Actions,
    private metricsService: MetricsService,
    private store: Store
  ) {}

  loadDoctorMetrics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(metricsActions.loadDoctorMetrics),
      withLatestFrom(this.store.select(selectDoctorMetrics)),
      switchMap(([action, metrics]) => {
        if (metrics && !isEmptyObject(metrics)) {
          return of(metricsActions.retainDoctorMetrics());
        } else {
          return this.metricsService.getDoctorMetrics().pipe(
            map((metrics: DoctorMetrics) => {
              return metricsActions.loadDoctorMetricsSuccess({ metrics });
            }),
            catchError((error) =>
              of(metricsActions.loadDoctorMetricsFailure({ error }))
            )
          );
        }
      })
    )
  );
}
