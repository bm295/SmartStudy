import { Component, inject, signal } from '@angular/core';
import { AuthStateService } from '../../core/auth/auth-state.service';

@Component({
  selector: 'smartstudy-auth',
  standalone: true,
  template: `
    <section>
      <h2>Authentication</h2>

      @if (!auth.isAuthenticated()) {
        <label for="email">Email</label>
        <input id="email" type="email" [value]="email()" (input)="onEmailInput($event)" />

        <label for="name">Name</label>
        <input id="name" type="text" [value]="name()" (input)="onNameInput($event)" />

        <button type="button" (click)="login()">Login</button>
      } @else {
        <p>Logged in as: <strong>{{ auth.user()?.name }}</strong> ({{ auth.user()?.email }})</p>
        <button type="button" (click)="auth.logout()">Logout</button>
      }
    </section>
  `,
})
export class AuthComponent {
  readonly auth = inject(AuthStateService);

  readonly email = signal('student@smartstudy.ai');
  readonly name = signal('Smart Student');

  onEmailInput(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.email.set(value);
  }

  onNameInput(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.name.set(value);
  }

  login(): void {
    const cleanEmail = this.email().trim();
    const cleanName = this.name().trim();

    if (!cleanEmail || !cleanName) {
      return;
    }

    this.auth.login({
      token: crypto.randomUUID(),
      user: {
        id: crypto.randomUUID(),
        email: cleanEmail,
        name: cleanName,
        role: 'student',
      },
    });
  }
}
