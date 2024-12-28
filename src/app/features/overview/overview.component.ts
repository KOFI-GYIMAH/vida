import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PatientsService } from '@services/patients.service';
import type { PatientRecord } from '@shared/models';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [TableModule, TagModule, CommonModule, RouterLink],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  patients!: PatientRecord[];
  selectedPatients!: PatientRecord[];
  loading: boolean = true;

  constructor(private patientsService: PatientsService) {}

  ngOnInit() {
    this.patientsService.getPatients().subscribe((patients) => {
      this.patients = patients.data.splice(0, 3);
      this.loading = false;
    });
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
