import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService, AuthUser } from './auth-state.service';

export const roleGuard: CanActivateFn = (route) => {
  const user = inject(AuthStateService).user();
  const roles = route.data['roles'] as AuthUser['role'][] | undefined;
  return user && roles?.includes(user.role)
    ? true
    : inject(Router).createUrlTree(['/auth']);
};
