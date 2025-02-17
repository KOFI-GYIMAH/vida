import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PatientsService } from '@services/patients.service';
import { TableSkeletonComponent } from '@shared/components/table-skeleton.component';
import { PatientRecord } from '@shared/models';
import {
  loadPatients,
  selectPatients,
  selectPatientsLoading,
} from '@store/patients';
import { calculateAge } from '@utils/date.utils';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Observable } from 'rxjs';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { RunAnalysisComponent } from './run-analysis/run-analysis.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    CommonModule,
    MultiSelectModule,
    InputTextModule,
    DropdownModule,
    SliderModule,
    ProgressBarModule,
    SidebarModule,
    PatientDetailsComponent,
    RunAnalysisComponent,
    TableSkeletonComponent,
    MenuModule,
  ],
  providers: [PatientsService],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css',
})
export class PatientsComponent implements OnInit {
  patients$: Observable<PatientRecord[]> = this.store.select(selectPatients);
  loading$: Observable<boolean> = this.store.select(selectPatientsLoading);

  sidebarVisible: boolean = false;
  selectedPatient!: PatientRecord;

  items: MenuItem[] = [
    {
      label: 'Options',
      items: [
        {
          label: 'Run Analysis',
          icon: 'pi pi-play',
          command: (event: any) => {
            this.router.navigate([
              'patients',
              this.selectedPatient.id,
              'medical-records',
            ]);
          },
        },
        {
          label: 'View Profile',
          icon: 'pi pi-user',
          command: (event: any) => {
            this.sidebarVisible = true;
          },
        },
      ],
    },
  ];

  calculateAge = calculateAge;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
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

  setActivePatient(patient: PatientRecord) {
    this.selectedPatient = patient;
    // this.sidebarVisible = true;
  }

  clear(table: Table) {
    table.clear();
  }
}
