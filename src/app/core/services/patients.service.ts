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

  getPatient(id: string): Observable<any> {
    return this.apiService.get(`patients/${id}`);
  }

  addPatient(patient: PatientPayload): Observable<AddPatientResponse> {
    return this.apiService.post('patients/register', patient);
  }

  createMedicalRecord(patientId: string, payload: any): Observable<any> {
    return this.apiService.post(
      `reports/patients/${patientId}/create`,
      payload
    );
  }

  getMedicalRecords(id: string): Observable<MedicalRecordResponse> {
    return this.apiService.get<MedicalRecordResponse>(
      `reports/patients/${id}/paginated`
    );
  }
}
