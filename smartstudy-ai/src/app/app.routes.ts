import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';

const studyAccess = { canActivate: [authGuard, roleGuard], data: { roles: ['student', 'admin'] } };

export const routes: Routes = [
  {
    path: '',
    ...studyAccess,
    loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'planner',
    ...studyAccess,
    loadComponent: () => import('./features/planner/planner.component').then((m) => m.PlannerComponent),
  },
  {
    path: 'flashcards',
    ...studyAccess,
    loadComponent: () => import('./features/flashcards/flashcards.component').then((m) => m.FlashcardsComponent),
  },
  {
    path: 'pomodoro',
    ...studyAccess,
    loadComponent: () => import('./features/pomodoro/pomodoro.component').then((m) => m.PomodoroComponent),
  },
  {
    path: 'gamification',
    ...studyAccess,
    loadComponent: () => import('./features/gamification/gamification.component').then((m) => m.GamificationComponent),
  },
];
