import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '@services/local-storage.service';

/**
 * A route guard that prevents the user from accessing a route if they have a
 * valid authentication token. If the user has a valid token, it redirects them
 * back to the home page.
 *
 * If the user does not have a valid token, it allows them to access the route.
 *
 * @param route The route that the user is trying to access.
 * @param state The current state of the router.
 * @returns A boolean indicating whether or not the user can access the route.
 */
export const noAuthGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const token = localStorageService.getItem('token');

  if (token !== null) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
