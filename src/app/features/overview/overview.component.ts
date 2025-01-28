import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
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
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [TableModule, TagModule, CommonModule, CardModule, ChartModule],
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

  stats = signal([
    {
      title: 'Total Patients',
      value: '1,234',
      icon: 'pi pi-users',
      color: '#3b82f6',
    },
    {
      title: 'Total Scans',
      value: '856',
      icon: 'pi pi-chart-line',
      color: '#22c55e',
    },
    {
      title: 'Medical Reports',
      value: '623',
      icon: 'pi pi-file',
      color: '#eab308',
    },
    {
      title: 'Inactive Patients',
      value: '89',
      icon: 'pi pi-user-minus',
      color: '#ef4444',
    },
  ]);

  chartOptions = signal({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  });

  chartData = signal({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Patients',
        data: [65, 75, 85, 95, 90, 100],
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.4,
      },
      {
        label: 'Scans',
        data: [45, 55, 65, 75, 70, 85],
        fill: false,
        borderColor: '#22c55e',
        tension: 0.4,
      },
      {
        label: 'Reports',
        data: [40, 48, 60, 70, 65, 80],
        fill: false,
        borderColor: '#eab308',
        tension: 0.4,
      },
    ],
  });
}
