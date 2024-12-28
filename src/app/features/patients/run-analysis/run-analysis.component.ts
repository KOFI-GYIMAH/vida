import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnalysisService } from '@services/analysis.service';
import { AnalysisResult } from '@shared/models';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { v4 as uuidv4 } from 'uuid';

interface FileItem {
  id: string;
  name: string;
  file: File;
  progress: number;
  preview?: string;
  analysisResult?: AnalysisResult;
  isAnalyzing?: boolean;
  eyeType: 'left' | 'right';
}

@Component({
  selector: 'app-run-analysis',
  standalone: true,
  imports: [
    FileUploadModule,
    CommonModule,
    RadioButtonModule,
    FormsModule,
    DialogModule,
  ],
  templateUrl: './run-analysis.component.html',
  styleUrl: './run-analysis.component.css',
})
export class RunAnalysisComponent {
  eye: string = 'leftEye';
  activeTab = 'Left Eye';
  activeTabIndex = 0;
  loading: boolean = false;

  leftEyeFiles: FileItem[] = [];
  rightEyeFiles: FileItem[] = [];

  @Input() visible: boolean = false;
  @Input() patientId: string = '';

  tabs = [{ label: 'Left Eye' }, { label: 'Right Eye' }];

  constructor(private analysisService: AnalysisService) {}

  setActiveTab(tabIndex: number) {
    this.activeTab = this.tabs[tabIndex].label;
    this.activeTabIndex = tabIndex;
  }

  createImagePreview(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => resolve(event.target.result);
        img.onerror = () => resolve('/assets/placeholder-image.png');
        img.src = event.target.result;
      };

      reader.onerror = (error) => resolve('/assets/placeholder-image.png');
      reader.readAsDataURL(file);
    });
  }

  async onFileSelect(event: any) {
    const files: File[] = event.target.files;
    const eyeType = this.activeTab === 'Left Eye' ? 'left' : 'right';

    const newFiles: FileItem[] = await Promise.all(
      Array.from(files).map(async (file) => {
        const fileNameParts = file.name.split('.');
        const baseFileName = fileNameParts.slice(0, -1).join('.');
        const fileExtension = fileNameParts[fileNameParts.length - 1];
        const modifiedFileName = `${baseFileName}_${eyeType}.${fileExtension}`;

        return {
          id: uuidv4(),
          name: modifiedFileName,
          file: file,
          progress: 0,
          preview: await this.createImagePreview(file),
          eyeType: eyeType,
          isAnalyzing: false,
        };
      })
    );

    if (this.activeTab === 'Left Eye') {
      this.leftEyeFiles = [...this.leftEyeFiles, ...newFiles];
    } else {
      this.rightEyeFiles = [...this.rightEyeFiles, ...newFiles];
    }
  }

  removeFile(isLeftEye: boolean, index: number) {
    if (isLeftEye) {
      this.leftEyeFiles.splice(index, 1);
    } else {
      this.rightEyeFiles.splice(index, 1);
    }
  }

  runAnalysis() {
    this.loading = true;

    const formData = new FormData();
    const uniqueId = uuidv4();

    const allFiles = [...this.leftEyeFiles, ...this.rightEyeFiles];
    allFiles.forEach((fileItem) => {
      fileItem.progress = 0;
      fileItem.isAnalyzing = true;
      fileItem.analysisResult = undefined;
    });

    // * Simulate progressive upload
    allFiles.forEach((fileItem) => {
      const progressInterval = setInterval(() => {
        if (fileItem.progress < 90) {
          fileItem.progress += 10;
        } else {
          clearInterval(progressInterval);
        }
      }, 200);
    });

    allFiles.forEach((fileItem) => {
      formData.append('files', fileItem.file, fileItem.name);
      formData.append('eyeTypes', fileItem.eyeType);
    });
    formData.append('sessionId', uniqueId);
    formData.append('patientId', this.patientId);

    this.analysisService.runAnalysis(formData).subscribe(
      (response) => {
        if (response && response.responseCode === 200) {
          allFiles.forEach((fileItem, index) => {
            fileItem.progress = 100;
            fileItem.isAnalyzing = false;

            fileItem.analysisResult = {
              ...response.data,
              doctorNote: '',
            };
          });
        }
        this.loading = false;
      },
      (error) => {
        allFiles.forEach((fileItem) => {
          fileItem.progress = 0;
          fileItem.isAnalyzing = false;
        });
        this.loading = false;
      }
    );
  }

  saveAnalysisNote(file: FileItem) {
    if (file.analysisResult) {
      console.log('Saving note for file:', file.name);
      console.log("Doctor's Note:", file.analysisResult.doctorNote);
    }
  }

  discardAll() {
    this.leftEyeFiles = [];
    this.rightEyeFiles = [];
  }
}
