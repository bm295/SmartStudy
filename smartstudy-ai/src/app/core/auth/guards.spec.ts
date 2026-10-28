import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, provideRouter } from '@angular/router';
import { AuthStateService } from './auth-state.service';
import { authGuard } from './auth.guard';
import { roleGuard } from './role.guard';

describe('route guards', () => {
  let auth: AuthStateService;
  let router: Router;
  const route = new ActivatedRouteSnapshot();
  const state = { url: '/planner?week=1' } as RouterStateSnapshot;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    auth = TestBed.inject(AuthStateService);
    router = TestBed.inject(Router);
  });

  afterEach(() => localStorage.clear());

  it('redirects signed-out users to login with their destination', () => {
    const result = TestBed.runInInjectionContext(() => authGuard(route, state));
    expect(router.serializeUrl(result as ReturnType<Router['createUrlTree']>))
      .toBe('/auth?returnUrl=%2Fplanner%3Fweek%3D1');
  });

  it('allows authenticated users and enforces configured roles', () => {
    auth.login({ token: 'token', user: { id: '1', email: 'a@b.test', name: 'A', role: 'student' } });
    expect(TestBed.runInInjectionContext(() => authGuard(route, state))).toBe(true);
    route.data = { roles: ['student'] };
    expect(TestBed.runInInjectionContext(() => roleGuard(route, state))).toBe(true);
    route.data = { roles: ['admin'] };
    const denied = TestBed.runInInjectionContext(() => roleGuard(route, state));
    expect(router.serializeUrl(denied as ReturnType<Router['createUrlTree']>)).toBe('/auth');
    route.data = {};
    expect(router.serializeUrl(TestBed.runInInjectionContext(() => roleGuard(route, state)) as ReturnType<Router['createUrlTree']>)).toBe('/auth');
  });
});
