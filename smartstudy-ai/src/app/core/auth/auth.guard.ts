import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from './auth-state.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthStateService);
  return auth.isAuthenticated()
    ? true
    : inject(Router).createUrlTree(['/auth'], { queryParams: { returnUrl: state.url } });
};
