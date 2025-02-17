import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    CalendarModule,
    TableModule,
    ButtonModule,
    DropdownModule,
  ],
  template: `
    <div class="p-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-xl">Welcome back, Alexandro 👋</h1>
          <p class="text-sm text-gray-600">
            Here is the latest update for the last 7 days. Check now
          </p>
        </div>
        <div class="flex gap-2">
          <!-- <p-dropdown [options]="timeframes" [(ngModel)]="selectedTimeframe"></p-dropdown> -->
          <button
            pButton
            label="Export"
            icon="pi pi-download"
            class="p-button-outlined"
          ></button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <!-- Overall Visitors -->
        <div class="bg-emerald-700 text-white p-4 rounded-lg">
          <div class="flex justify-between mb-4">
            <h3>Overall visitors</h3>
            <button class="text-white"><i class="pi pi-ellipsis-h"></i></button>
          </div>
          <div class="text-3xl font-bold mb-2">10,525</div>
          <div class="flex items-center text-sm">
            <span class="bg-emerald-800 px-2 py-1 rounded mr-2">+15.2%</span>
            <span>1,345 today</span>
          </div>
        </div>

        <!-- Total Patient -->
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="flex justify-between mb-4">
            <h3>Total patient</h3>
            <button><i class="pi pi-ellipsis-h"></i></button>
          </div>
          <div class="text-3xl font-bold mb-2">5,715</div>
          <div class="flex items-center text-sm">
            <span class="text-green-500">+10.4%</span>
          </div>
          <div class="mt-4 h-16">
            <p-chart
              type="bar"
              [data]="patientChartData"
              [options]="miniChartOptions"
            ></p-chart>
          </div>
        </div>

        <!-- Surgery -->
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="flex justify-between mb-4">
            <h3>Surgery</h3>
            <button><i class="pi pi-ellipsis-h"></i></button>
          </div>
          <div class="text-3xl font-bold mb-2">523</div>
          <div class="flex items-center text-sm">
            <span class="text-green-500">+165</span>
          </div>
          <div class="mt-4">
            <div class="bg-gray-200 rounded-full h-2">
              <div class="bg-blue-500 h-2 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>

        <!-- Overall Room -->
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="flex justify-between mb-4">
            <h3>Overall Room</h3>
            <button><i class="pi pi-ellipsis-h"></i></button>
          </div>
          <div class="text-3xl font-bold mb-2">221</div>
          <div class="flex items-center text-sm">
            <span class="text-green-500">+146</span>
          </div>
          <div class="mt-4">
            <div class="flex justify-between text-sm">
              <span>General Room</span>
              <span>110</span>
            </div>
            <div class="flex justify-between text-sm mt-2">
              <span>Private Room</span>
              <span>111</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Patient Statistics and Calendar -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Patient Statistics -->
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Patient Statistics</h3>
          <div class="h-64">
            <p-chart
              type="bar"
              [data]="weeklyStats"
              [options]="barChartOptions"
            ></p-chart>
          </div>
        </div>

        <!-- Calendar -->
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Calendar</h3>
            <div class="flex gap-2">
              <span class="text-sm flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
                Appointment
              </span>
              <span class="text-sm flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-blue-400"></span>
                Meeting
              </span>
              <span class="text-sm flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-green-400"></span>
                Surgery
              </span>
            </div>
          </div>
          <p-calendar [inline]="true" [showWeek]="true"></p-calendar>
        </div>
      </div>

      <!-- Patient List -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">All Patients</h3>
        <p-table [value]="patients" [paginator]="true" [rows]="5">
          <ng-template pTemplate="header">
            <tr>
              <th>ID Code</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Created Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-patient>
            <tr>
              <td>{{ patient.id }}</td>
              <td>{{ patient.name }}</td>
              <td>{{ patient.age }}</td>
              <td>{{ patient.createdDate }}</td>
              <td>{{ patient.time }}</td>
              <td>{{ patient.type }}</td>
              <td>
                <span [class]="'status-badge ' + patient.status.toLowerCase()">
                  {{ patient.status }}
                </span>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>
    </div>
  `,
  styles: [
    `
      .status-badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.875rem;
      }
      .status-badge.pending {
        background-color: #fff3e0;
        color: #ff9800;
      }
      .status-badge.confirmed {
        background-color: #e3f2fd;
        color: #2196f3;
      }
    `,
  ],
})
export class DashboardComponent {
  timeframes = [
    { label: 'Last Week', value: 'week' },
    { label: 'Last Month', value: 'month' },
    { label: 'Last Year', value: 'year' },
  ];
  selectedTimeframe = 'week';

  patientChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: '#4CAF50',
      },
    ],
  };

  miniChartOptions = {
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
    responsive: true,
    maintainAspectRatio: false,
  };

  weeklyStats = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        label: 'Patient',
        backgroundColor: '#4CAF50',
        data: [950, 792, 501, 800, 500, 500, 260],
      },
      {
        label: 'E-patient',
        backgroundColor: '#FFC107',
        data: [480, 493, 150, 523, 150, 150, 100],
      },
    ],
  };

  barChartOptions = {
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: { beginAtZero: true },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  patients = [
    {
      id: '#FUP1213424',
      name: 'Isagi Yoichi',
      age: 20,
      createdDate: '25 Dec 2023',
      time: '08:30 pm',
      type: 'FUP+ECG',
      status: 'Pending',
    },
    {
      id: '#121312424',
      name: 'Kaiser Brown',
      age: 23,
      createdDate: '01 Dec 2023',
      time: '12:30 pm',
      type: 'FUP',
      status: 'Confirmed',
    },
  ];
}
