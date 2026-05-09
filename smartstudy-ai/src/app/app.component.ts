import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthStateService } from './core/auth/auth-state.service';

@Component({
  selector: 'smartstudy-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <main>
      <h1>SmartStudy AI</h1>
      <p>{{ subtitle() }}</p>
      <section>
        <strong>Upcoming deadlines:</strong> {{ upcomingDeadlines() }}
      </section>

      <p>
        Authentication status:
        <strong>{{ auth.isAuthenticated() ? 'Logged in' : 'Logged out' }}</strong>
      </p>

      <nav>
        <a routerLink="/">Dashboard</a> |
        <a routerLink="/auth">Auth</a> |
        <a routerLink="/planner">Planner</a> |
        <a routerLink="/flashcards">Flashcards</a> |
        <a routerLink="/pomodoro">Pomodoro</a> |
        <a routerLink="/gamification">Gamification</a>
      </nav>

      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  readonly auth = inject(AuthStateService);

  readonly productName = signal('SmartStudy AI');
  readonly deadlines = signal([
    { subject: 'Math', dueInDays: 2 },
    { subject: 'History', dueInDays: 4 },
  ]);

  readonly subtitle = computed(
    () => `${this.productName()} - nền tảng học tập thông minh cho học sinh, sinh viên`,
  );

  readonly upcomingDeadlines = computed(
    () => this.deadlines().filter((item) => item.dueInDays <= 3).length,
  );
}
