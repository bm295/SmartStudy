export const routes = [
  {
    path: '',
    loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'planner',
    loadComponent: () => import('./features/planner/planner.component').then((m) => m.PlannerComponent),
  },
  {
    path: 'flashcards',
    loadComponent: () => import('./features/flashcards/flashcards.component').then((m) => m.FlashcardsComponent),
  },
  {
    path: 'pomodoro',
    loadComponent: () => import('./features/pomodoro/pomodoro.component').then((m) => m.PomodoroComponent),
  },
  {
    path: 'gamification',
    loadComponent: () => import('./features/gamification/gamification.component').then((m) => m.GamificationComponent),
  },
];
