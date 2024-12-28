import { Injectable } from '@angular/core';
import { AnalysisResponse } from '@shared/models';
import { Observable } from 'rxjs';
import { APIConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  constructor(private apiService: APIConfigService) {}

  runAnalysis(formData: FormData): Observable<AnalysisResponse> {
    return this.apiService.post('images/upload-images', formData);
  }

  saveAnalysisNote(fileId: string, note: string): Observable<any> {
    return this.apiService.post('analysis/save-note', { fileId, note });
  }
}
