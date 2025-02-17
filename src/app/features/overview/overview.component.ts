import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import type {
  AdminMetrics,
  DoctorMetrics,
  PatientRecord,
  User,
} from '@shared/models';
import {
  loadAdminMetrics,
  loadDoctorMetrics,
  selectAdminMetrics,
  selectDoctorMetrics,
  selectDoctorMetricsLoading,
} from '@store/metrics';
import {
  loadPatients,
  selectPatients,
  selectPatientsLoading,
} from '@store/patients';
import { loadUserRecordSuccess } from '@store/user';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Observable } from 'rxjs';
import { LocalStorageService } from './../../core/services/local-storage.service';
import { DashboardComponent } from './x';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    CommonModule,
    CardModule,
    ChartModule,
    DashboardComponent,
  ],
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
  adminMetrics$: Observable<AdminMetrics> =
    this.store.select(selectAdminMetrics);

  user!: User;

  // pie chart
  data: any;
  options: any;

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService
  ) {}

  stats = signal([
    {
      title: 'Total Patients',
      value: '0',
      icon: 'pi pi-users',
      color: '#3b82f6',
    },
    {
      title: 'Total Analyzed Images',
      value: '',
      icon: 'pi pi-chart-line',
      color: '#047857',
    },
    {
      title: 'Medical Reports',
      value: '0',
      icon: 'pi pi-file',
      color: '#eab308',
    },
    {
      title: 'Average Confidence',
      value: '0',
      icon: 'pi pi-user-minus',
      color: '#ef4444',
    },
  ]);

  ngOnInit() {
    this.store.dispatch(loadDoctorMetrics());
    this.store.dispatch(loadAdminMetrics());
    this.store.dispatch(loadPatients());

    const user = this.localStorageService.getItem('user');
    if (user) {
      this.store.dispatch(loadUserRecordSuccess({ user }));
      this.user = user;
    }

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    // Default pie chart structure
    this.data = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        },
      ],
    };

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };

    if (this.adminMetrics$) {
      this.adminMetrics$.subscribe((metrics) => {
        this.stats.update((stats) => {
          stats[0].value = metrics.totalPatients.toString();
          stats[1].value = metrics.totalAnalyzedImages.toString();
          stats[2].value = metrics.totalMedicalReports.toString();
          stats[3].value = this.toPercentage(metrics.averageConfidence);
          return stats;
        });

        // Extract labels and values for Pie Chart
        const labels = Object.keys(metrics.pieChartData);
        const data = Object.values(metrics.pieChartData);

        // Assign colors dynamically
        const backgroundColors = [
          documentStyle.getPropertyValue('--blue-500'),
          documentStyle.getPropertyValue('--yellow-500'),
          documentStyle.getPropertyValue('--green-500'),
          documentStyle.getPropertyValue('--red-500'),
          documentStyle.getPropertyValue('--purple-500'),
        ];

        const hoverBackgroundColors = [
          documentStyle.getPropertyValue('--blue-400'),
          documentStyle.getPropertyValue('--yellow-400'),
          documentStyle.getPropertyValue('--green-400'),
          documentStyle.getPropertyValue('--red-400'),
          documentStyle.getPropertyValue('--purple-400'),
        ];

        // Update Pie Chart Data
        this.data = {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColors.slice(0, labels.length),
              hoverBackgroundColor: hoverBackgroundColors.slice(
                0,
                labels.length
              ),
            },
          ],
        };
      });
    }
  }


  toPercentage(value: number, decimalPlaces: number = 2): string {
    return (value * 100).toFixed(decimalPlaces) + '%';
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
