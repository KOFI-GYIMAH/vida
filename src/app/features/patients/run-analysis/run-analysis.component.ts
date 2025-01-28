import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnalysisService } from '@services/analysis.service';
import { PatientsService } from '@services/patients.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { v4 as uuidv4 } from 'uuid';

interface ImageData {
  id: string;
  name: string;
  file: File;
  preview: string;
  analysis?: {
    prediction: string;
    confidence: number;
  };
  eyeType: 'left' | 'right';
  inferenceComment?: string;
}

@Component({
  selector: 'app-run-analysis',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule],
  templateUrl: './run-analysis.component.html',
  styleUrl: './run-analysis.component.css',
})
export class RunAnalysisComponent implements OnInit {
  leftImages = new Map<string, ImageData>();
  rightImages = new Map<string, ImageData>();
  isDraggingLeft = false;
  isDraggingRight = false;
  isProcessing = false;
  uniqueId = uuidv4();
  isAnalysisRun = false;

  @Input() visible: boolean = false;
  @Input() patientId: string = '';

  constructor(
    private analysisService: AnalysisService,
    private patientsService: PatientsService,
    private messageService: MessageService
  ) {}

  get leftImagesArray(): ImageData[] {
    return Array.from(this.leftImages.values());
  }

  get rightImagesArray(): ImageData[] {
    return Array.from(this.rightImages.values());
  }

  get isAnalyzeDisabled(): boolean {
    // return this.leftImages.size === 0 || this.rightImages.size === 0;
    return false;
  }

  ngOnInit() {}

  onDragEnter(event: DragEvent, side: 'left' | 'right') {
    event.preventDefault();
    event.stopPropagation();
    if (side === 'left') this.isDraggingLeft = true;
    else this.isDraggingRight = true;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent, side: 'left' | 'right') {
    event.preventDefault();
    event.stopPropagation();
    if (side === 'left') this.isDraggingLeft = false;
    else this.isDraggingRight = false;
  }

  onDrop(event: DragEvent, side: 'left' | 'right') {
    event.preventDefault();
    event.stopPropagation();

    if (side === 'left') this.isDraggingLeft = false;
    else this.isDraggingRight = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files, side);
    }
  }

  onFileSelected(event: Event, side: 'left' | 'right') {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files, side);
    }
  }

  handleFiles(fileList: FileList, side: 'left' | 'right') {
    Array.from(fileList).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const id = uuidv4();
          const imageData: ImageData = {
            id,
            name: file.name,
            file,
            preview: e.target?.result as string,
            eyeType: side,
          };

          if (side === 'left') {
            this.leftImages.set(id, imageData);
          } else {
            this.rightImages.set(id, imageData);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  removeImage(side: 'left' | 'right', id: string) {
    if (side === 'left') {
      this.leftImages.delete(id);
    } else {
      this.rightImages.delete(id);
    }
  }

  clearAll(side: 'left' | 'right') {
    if (side === 'left') {
      this.leftImages.clear();
    } else {
      this.rightImages.clear();
    }
  }

  removeConfidence(text: string): string {
    return text.replace(/\s*\(Confidence: \d+\.\d+%\)$/, '');
  }

  async analyzeImages() {
    this.isProcessing = true;
    const formData = new FormData();

    const allFiles = [
      ...Array.from(this.leftImages.values()),
      ...Array.from(this.rightImages.values()),
    ];

    allFiles.forEach((fileItem) => {
      formData.append('files', fileItem.file, fileItem.name);
      formData.append('eyeTypes', fileItem.eyeType);
    });

    formData.append('sessionId', this.uniqueId);
    formData.append('patientId', this.patientId);

    this.analysisService.runAnalysis(formData).subscribe({
      next: (response) => {
        if (response && response.responseCode === 200) {
          response.data.forEach((fileItem: any) => {
            const file = allFiles.find((f) => f.name === fileItem.name);
            if (file) {
              file.analysis = {
                prediction: this.removeConfidence(fileItem.inferenceResult),
                confidence: fileItem.confidence,
              };
            }
          });
        }
        this.isAnalysisRun = true;
      },
      error: (error) => {
        console.error('Error during analysis:', error);
      },
      complete: () => {
        this.isProcessing = false;
      },
    });
  }

  async submitFinalComments() {
    this.isProcessing = true;
    const allFiles = [
      ...Array.from(this.leftImages.values()),
      ...Array.from(this.rightImages.values()),
    ];

    const analyzedFiles = allFiles.filter((file) => file.analysis);

    const payloads = analyzedFiles.map((file) => ({
      sessionId: this.uniqueId,
      diagnosis: `${file.analysis?.prediction} (Confidence: ${file.analysis?.confidence}%)`,
      doctorNotes: file.inferenceComment || '',
    }));

    try {
      for (const payload of payloads) {
        const response = await this.patientsService
          .createMedicalRecord(this.patientId, payload)
          .toPromise();

        if (response && response.responseCode === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Record created successfully',
          });
        } else {
          console.error(
            `Failed to create record for sessionId: ${payload.sessionId}`
          );
        }
      }
    } catch (error) {
      console.error('Error submitting records:', error);
    } finally {
      this.isProcessing = false;
      this.visible = false;
    }
  }
}
