import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginPayload, RegisterPayload } from '@shared/models';
import { resetUserState } from '@store/user';
import { Observable } from 'rxjs';
import { APIConfigService } from './api-config.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private apiService: APIConfigService,
    private store: Store
  ) {}

  register(payload: RegisterPayload): Observable<any> {
    return this.apiService.un_post('users/register', payload);
  }

  login(payload: LoginPayload): Observable<any> {
    return this.apiService.un_post('auth/login', payload);
  }

  resetPasswordLink(payload: { email: string }): Observable<any> {
    return this.apiService.un_post('auth/forgot-password', payload);
  }

  changePassword(payload: {
    newPassword: string;
    token: string;
  }): Observable<any> {
    return this.apiService.un_post('auth/reset-password/submit', payload);
  }

  logout() {
    this.apiService.post('auth/logout', {}).subscribe(() => {
      this.store.dispatch(resetUserState());
      this.localStorageService.clear();
      this.router.navigate(['/']);
    });
  }
}
