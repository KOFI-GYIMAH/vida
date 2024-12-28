import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DoctorRecord } from '@shared/models';
import {
  loadDoctors,
  selectDoctors,
  selectDoctorsLoading,
} from '@store/doctors';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Observable } from 'rxjs';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';

@Component({
  selector: 'app-doctors',
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
    DoctorDetailsComponent,
  ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  doctors$: Observable<DoctorRecord[]> = this.store.select(selectDoctors);
  loading$: Observable<boolean> = this.store.select(selectDoctorsLoading);

  sidebarVisible: boolean = false;
  selectedDoctor!: DoctorRecord;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadDoctors());
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

  setActiveDoctor(doctor: DoctorRecord) {
    this.selectedDoctor = doctor;
    this.sidebarVisible = true;
  }

  clear(table: Table) {
    table.clear();
  }
}
