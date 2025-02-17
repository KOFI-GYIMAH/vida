import { Injectable } from '@angular/core';
import { DoctorRecordResponse } from '@shared/models';
import { Observable } from 'rxjs';
import { APIConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private apiService: APIConfigService) {}

  getDoctors(): Observable<DoctorRecordResponse> {
    return this.apiService.get<DoctorRecordResponse>('users/all');
  }

  updateDoctorProfile(id: number, data: any): Observable<any> {
    return this.apiService.patch(`users/update/${id}`, data);
  }
}
