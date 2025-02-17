import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '@services/patients.service';
import { TableSkeletonComponent } from '@shared/components/table-skeleton.component';
import type { MedicalRecord } from '@shared/models';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { RunAnalysisComponent } from '../run-analysis/run-analysis.component';
import { ProgressBarComponent } from '@shared/components/progress.component';
import { SidebarModule } from 'primeng/sidebar';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';

@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [
    CommonModule,
    TableSkeletonComponent,
    ButtonModule,
    TableModule,
    RunAnalysisComponent,
    DialogModule,
    ProgressBarComponent,
    SidebarModule,
    PatientDetailsComponent,
  ],
  templateUrl: './medical-records.component.html',
  styleUrl: './medical-records.component.css',
})
export class MedicalRecordsComponent implements OnInit {
  loading = false;
  medRecords: MedicalRecord[] = [];

  selectedRecord: MedicalRecord = {} as MedicalRecord;
  visible: boolean = false;
  sidebarVisible: boolean = false;

  runAnalysisVisible: boolean = false;
  patientId: string = this.route.snapshot.params['id'];

  constructor(
    private route: ActivatedRoute,
    private patientsService: PatientsService
  ) {}

  ngOnInit() {
    this.loadMedicalRecords();
    // if (this.patientId) {
    //   this.patientsService.getPatient(this.patientId).subscribe((res) => {
    //     this.sidebarVisible = true;
    //     // this._patient = res.data;
    //     console.log(res);
    //   });
    // }
  }

  loadMedicalRecords() {
    if (this.patientId) {
      this.loading = true;
      this.patientsService.getMedicalRecords(this.patientId).subscribe(
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
          // console.log(error);
          this.loading = false;
        }
      );
    }
  }

  openCreateMedRecordModal() {
    this.runAnalysisVisible = true;
  }

  onRunAnalysisClose() {
    this.runAnalysisVisible = false;
  }

  showDialog(record: MedicalRecord) {
    this.selectedRecord = record;
    this.visible = true;
  }

  convertToPercentage(value: number): number {
    return Math.min(Math.max(value, 0), 100);
  }
}
