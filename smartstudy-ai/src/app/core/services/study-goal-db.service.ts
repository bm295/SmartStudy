import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StudyGoalDbService {
  private readonly storageKey = 'smartstudy.studyGoal';

  loadGoal(): string {
    if (typeof localStorage === 'undefined') {
      return '';
    }

    try {
      return localStorage.getItem(this.storageKey) ?? '';
    } catch {
      return '';
    }
  }

  saveGoal(goal: string): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(this.storageKey, goal.trim());
    } catch {
      // Ignore storage errors in local blueprint mode.
    }
  }
}
