import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private apiService: APIConfigService) {}

  getUserStats(): Observable<any> {
    return this.apiService.get('user/dashboard/metrics');
  }
}
