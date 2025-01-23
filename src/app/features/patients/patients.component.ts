import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PatientsService } from '@services/patients.service';
import { PatientRecord } from '@shared/models';
import {
  loadPatients,
  selectPatients,
  selectPatientsLoading,
} from '@store/patients';
import { calculateAge } from '@utils/date.utils';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
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

  calculateAge = calculateAge;

  constructor(private store: Store) {}

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
    this.sidebarVisible = true;
  }

  clear(table: Table) {
    table.clear();
  }
}
