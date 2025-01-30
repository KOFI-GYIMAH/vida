import { Injectable } from '@angular/core';
import { AdminMetrics, DoctorMetrics } from '@shared/models';
import { Observable } from 'rxjs';
import { APIConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  constructor(private apiService: APIConfigService) {}

  getDoctorMetrics(): Observable<DoctorMetrics> {
    return this.apiService.get<DoctorMetrics>('user/dashboard/metrics');
  }

  getAdminMetrics(): Observable<AdminMetrics> {
    return this.apiService.get<AdminMetrics>('admin/dashboard/metrics');
  }
}
