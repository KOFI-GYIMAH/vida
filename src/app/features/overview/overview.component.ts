import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import type { DoctorMetrics, PatientRecord } from '@shared/models';
import {
  loadDoctorMetrics,
  selectDoctorMetrics,
  selectDoctorMetricsLoading,
} from '@store/metrics';
import {
  loadPatients,
  selectPatients,
  selectPatientsLoading,
} from '@store/patients';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [TableModule, TagModule, CommonModule, RouterLink],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  selectedPatients!: PatientRecord[];
  loading$: Observable<boolean> = this.store.select(selectPatientsLoading);
  patients$: Observable<PatientRecord[]> = this.store.select(selectPatients);

  doctorMetricsLoading$: Observable<boolean> = this.store.select(
    selectDoctorMetricsLoading
  );
  doctorMetrics$: Observable<DoctorMetrics> =
    this.store.select(selectDoctorMetrics);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadDoctorMetrics());
    this.store.dispatch(loadPatients());
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INACTIVE':
        return 'danger';
      case 'ACTIVE':
        return 'success';
      default:
        return 'info';
    }
  }
}
