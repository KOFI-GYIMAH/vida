import { Injectable } from '@angular/core';
import {
  AddPatientResponse,
  MedicalRecordResponse,
  PatientPayload,
  PatientRecordResponse,
} from '@shared/models';
import { Observable } from 'rxjs';
import { APIConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private apiService: APIConfigService) {}

  getPatients(): Observable<PatientRecordResponse> {
    return this.apiService.get<PatientRecordResponse>('patients');
  }

  addPatient(patient: PatientPayload): Observable<AddPatientResponse> {
    return this.apiService.post('patients/register', patient);
  }

  getMedicalRecords(id: string): Observable<MedicalRecordResponse> {
    return this.apiService.get<MedicalRecordResponse>(`reports/patients/${id}`);
  }
}
