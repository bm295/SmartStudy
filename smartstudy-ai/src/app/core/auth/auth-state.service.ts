import { Injectable, computed, signal } from '@angular/core';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
}

interface AuthSession {
  token: string;
  user: AuthUser;
}

const AUTH_STORAGE_KEY = 'smartstudy.auth.session';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private readonly sessionSignal = signal<AuthSession | null>(this.loadPersistedSession());

  readonly session = this.sessionSignal.asReadonly();
  readonly user = computed(() => this.sessionSignal()?.user ?? null);
  readonly token = computed(() => this.sessionSignal()?.token ?? null);
  readonly isAuthenticated = computed(() => !!this.sessionSignal()?.token);

  login(session: AuthSession): void {
    this.sessionSignal.set(session);
    this.persistSession(session);
  }

  logout(): void {
    this.sessionSignal.set(null);
    this.clearPersistedSession();
  }

  private loadPersistedSession(): AuthSession | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      this.clearPersistedSession();
      return null;
    }
  }

  private persistSession(session: AuthSession): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  }

  private clearPersistedSession(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}
