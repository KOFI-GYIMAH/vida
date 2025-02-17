import { Routes } from '@angular/router';
import { ChangePasswordComponent } from '@app/auth/change-password/change-password.component';
import { LoginComponent } from '@app/auth/login/login.component';
import { RegisterComponent } from '@app/auth/register/register.component';
import { ResetPasswordLinkComponent } from '@app/auth/reset-password-link/reset-password-link.component';
import { DoctorsRequestsComponent } from '@app/doctors/doctors-requests/doctors-requests.component';
import { DoctorsComponent } from '@app/doctors/doctors.component';
import { LandingPageComponent } from '@app/landing-page/landing-page.component';
import { OverviewComponent } from '@app/overview/overview.component';
import { AddPatientComponent } from '@app/patients/add-patient/add-patient.component';
import { MedicalRecordsComponent } from '@app/patients/medical-records/medical-records.component';
import { PatientsComponent } from '@app/patients/patients.component';
import { SettingsComponent } from '@app/settings/settings.component';
import { authGuard } from './core/guard/auth.guard';
import { noAuthGuard } from './core/guard/no-auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    title: 'Vision Impairment Diagnostic Assistant | Welcome!',
    component: LandingPageComponent,
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [noAuthGuard],
    children: [
      {
        path: 'register',
        title: 'Register | Vision Impairment Diagnostic Assistant',
        component: RegisterComponent,
      },
      {
        path: 'login',
        title: 'Login | Vision Impairment Diagnostic Assistant',
        component: LoginComponent,
      },
      {
        path: 'reset-password-link',
        title: 'Reset Password | Vision Impairment Diagnostic Assistant',
        component: ResetPasswordLinkComponent,
      },
      {
        path: 'change-password',
        title: 'Change Password | Vision Impairment Diagnostic Assistant',
        component: ChangePasswordComponent,
      },
    ],
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'overview',
        title: 'Overview | Vision Impairment Diagnostic Assistant',
        component: OverviewComponent,
      },
      {
        path: 'patients',
        title: 'Patients | Vision Impairment Diagnostic Assistant',
        component: PatientsComponent,
      },
      {
        path: 'patients-add',
        title: 'Add Patient | Vision Impairment Diagnostic Assistant',
        component: AddPatientComponent,
      },
      {
        path: 'patients/:id/medical-records',
        title: 'Patient Details | Vision Impairment Diagnostic Assistant',
        component: MedicalRecordsComponent,
      },
      {
        path: 'doctors',
        title: 'Doctors | Vision Impairment Diagnostic Assistant',
        component: DoctorsComponent,
      },
      {
        path: 'doctors-requests',
        title: 'Doctors Requests | Vision Impairment Diagnostic Assistant',
        component: DoctorsRequestsComponent,
      },
      {
        path: 'settings',
        title: 'Settings | Vision Impairment Diagnostic Assistant',
        component: SettingsComponent,
      },
    ],
  },
];
