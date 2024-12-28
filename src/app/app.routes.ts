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
import { PatientsComponent } from '@app/patients/patients.component';
import { RunAnalysisComponent } from '@app/patients/run-analysis/run-analysis.component';
import { SettingsComponent } from '@app/settings/settings.component';
import { authGuard } from './core/guard/auth.guard';
import { noAuthGuard } from './core/guard/no-auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [noAuthGuard],
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'reset-password-link',
        component: ResetPasswordLinkComponent,
      },
      {
        path: 'change-password',
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
        path: 'r',
        component: RunAnalysisComponent,
      },
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'patients',
        component: PatientsComponent,
      },
      {
        path: 'patients-add',
        component: AddPatientComponent,
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
      },
      {
        path: 'doctors-requests',
        component: DoctorsRequestsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
];
