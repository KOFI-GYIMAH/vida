export interface User {
  accessToken: string;
  accessTokenExpiration: string;
  createdAt: string;
  createdBy: string;
  customId: string;
  deletedAt: string | null;
  deletedBy: string | null;
  email: string;
  firstName: string;
  lastName: string;
  licenceId: string | null;
  middleName: string;
  modifiedAt: string;
  modifiedBy: string;
  phoneNumber: string;
  refreshToken: string;
  refreshTokenExpiration: string;
  roles: string[];
  status: 'ACTIVE' | 'INACTIVE';
  userId: number;
}
