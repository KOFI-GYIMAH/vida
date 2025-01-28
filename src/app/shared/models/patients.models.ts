export interface PatientRecord {
  id: string;
  customId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  phoneNumber: string;
  insuranceNumber: string;
  diabetesType: 'Type 1' | 'Type 2';
  diabetesDiagnosisDate: string;
  currentRegimen: string;
  visualAcuity: string;
  glucoseLevel: string;
  email: string;
  familyHistoryOfDiabetes: 'Yes' | 'No';
  otherMedicalConditions: string;
  eyeConditionsHistory: string;
  lastVisitDate: string;
  userId: number;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  status: 'ACTIVE' | 'INACTIVE';
  deletedAt: string | null;
  deletedBy: string | null;
}

export interface PatientRecordResponse {
  data: PatientRecord[];
  status: number;
  message: string;
}

interface InferenceImage {
  id: string;
  inferenceResult: string;
  confidence: number;
  imageUrl: string;
  position: 'LEFT' | 'RIGHT' | null;
}

export interface MedicalRecord {
  id: string;
  customId: string;
  patientId: string;
  diagnosis: string;
  doctorNotes: string;
  images: InferenceImage[];
  status: 'ACTIVE' | 'INACTIVE';
  referrable: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface MedicalRecordResponse {
  data: { content: MedicalRecord[] };
  status: number;
  message: string;
}

export type PatientPayload = {
  firstName: string;
  lastName: string;
  dob: Date | null;
  gender: string;
  phoneNumber: string;
  email: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  insuranceStartDate?: string;
  insuranceEndDate?: string;
  diabeticStatus: 'Yes' | 'No';
  diabeticType?: string;
  diabeticDiagnoseDate?: string;
  currentRegimen?: string;
  diabeticFamilyHistory?: string;
  partEyeCondition?: string;
  partEyeConditionStatement?: string;
  otherMedicalConditions?: string;
};

export interface AddPatientResponse {
  data: PatientRecord;
  status: number;
  message: string;
}

export type FileAnalysisStatus = 'SUCCESS' | 'FAILED' | 'PENDING';

export interface AnalysisResult {
  id: string;
  confidence: number;
  inferenceResult: string;
  sessionId: string;
  diagnosis: string;
  inferenceStatus: FileAnalysisStatus;
  doctorNote: string;
  name: string;
}

export type AnalysisResponse = {
  responseMessage: string;
  responseCode: number;
  data: AnalysisResult[];
};

export interface FileItem {
  id: string;
  name: string;
  file: File;
  progress: number;
  preview?: string;
  analysisResult?: AnalysisResult;
  isAnalyzing: boolean;
  eyeType: 'left' | 'right';
  error?: string;
}
