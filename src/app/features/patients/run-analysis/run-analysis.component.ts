import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AnalysisService } from '@services/analysis.service';
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
}

@Component({
  selector: 'app-run-analysis',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './run-analysis.component.html',
  styleUrl: './run-analysis.component.css',
})
export class RunAnalysisComponent implements OnInit {
  leftImages = new Map<string, ImageData>();
  rightImages = new Map<string, ImageData>();
  isDraggingLeft = false;
  isDraggingRight = false;
  isProcessing = false;

  @Input() visible: boolean = false;
  @Input() patientId: string = '';

  constructor(private analysisService: AnalysisService) {}

  get leftImagesArray(): ImageData[] {
    return Array.from(this.leftImages.values());
  }

  get rightImagesArray(): ImageData[] {
    return Array.from(this.rightImages.values());
  }

  get isAnalyzeDisabled(): boolean {
    return this.leftImages.size === 0 || this.rightImages.size === 0;
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
    const uniqueId = uuidv4();

    const allFiles = [
      ...Array.from(this.leftImages.values()),
      ...Array.from(this.rightImages.values()),
    ];

    allFiles.forEach((fileItem) => {
      formData.append('files', fileItem.file, fileItem.name);
      formData.append('eyeTypes', fileItem.eyeType);
    });

    formData.append('sessionId', uniqueId);
    formData.append('patientId', '934bb4ef-046f-45c0-8070-3460cdc6f5fb');

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
      },
      error: (error) => {
        console.error('Error during analysis:', error);
      },
      complete: () => {
        this.isProcessing = false;
      },
    });
  }
}
