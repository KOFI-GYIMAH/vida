export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  licenseId: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
