import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PatientsService } from '@services/patients.service';
import { ProgressBarComponent } from '@shared/components/progress.component';
import { TableSkeletonComponent } from '@shared/components/table-skeleton.component';
import type { PatientRecord } from '@shared/models';
import { MedicalRecord } from '@shared/models';
import { calculateAge } from '@utils/date.utils';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SidebarModule } from 'primeng/sidebar';
import { Table, TableModule } from 'primeng/table';
import { RunAnalysisComponent } from '../run-analysis/run-analysis.component';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    TableModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    ProgressBarComponent,
    RunAnalysisComponent,
    TableSkeletonComponent,
  ],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css',
})
export class PatientDetailsComponent implements OnInit {
  private _patient!: PatientRecord;

  @Input() set patient(value: PatientRecord) {
    this._patient = value;
    if (this._patient) {
      this.loadMedicalRecords();
    }
  }
  @Input() sidebarVisible: boolean = false;
  @Input() patientId: string = '';
  @Output() close = new EventEmitter<void>();

  runAnalysisVisible: boolean = false;

  selectedRecord: MedicalRecord = {} as MedicalRecord;

  get patient() {
    return this._patient;
  }

  loading: boolean = false;
  visible: boolean = false;

  medRecords: MedicalRecord[] = [];

  constructor(private patientsService: PatientsService) {}

  ngOnInit() {
    if (this.patientId) {
      this.patientsService.getPatient(this.patientId).subscribe((res) => {
        this.sidebarVisible = true;
        // this._patient = res.data;
        console.log(res.data);
      });
    }
  }

  calculateAge = calculateAge;

  loadMedicalRecords() {
    if (this._patient && this._patient.id) {
      this.loading = true;
      this.patientsService.getMedicalRecords(this._patient.id).subscribe(
        (res) => {
          // * sort by date
          res.data.content.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
          this.medRecords = res.data.content;
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
    }
  }

  clear(table: Table) {
    table.clear();
  }

  onClose() {
    this.close.emit();
  }

  showDialog(record: MedicalRecord) {
    this.selectedRecord = record;
    this.visible = true;
  }

  convertToPercentage(value: number): number {
    return Math.min(Math.max(value, 0), 100);
  }

  openCreateMedRecordModal() {
    // this.selectedPatient = patient;
    this.runAnalysisVisible = true;
  }
}
