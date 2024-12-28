export interface DoctorRecord {
  id: string;
  customId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  verified: boolean;
  email: string;
  phoneNumber: string;
  licenceId: string;
  roles: string[];
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  status: 'ACTIVE' | 'INACTIVE';
  deletedAt: string | null;
  deletedBy: string | null;
}

export interface DoctorRecordResponse {
  data: DoctorRecord[];
  status: number;
  message: string;
}

export interface DoctorRequest {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface DoctorRequestResponse {
  data: DoctorRequest[];
  status: number;
  message: string;
}