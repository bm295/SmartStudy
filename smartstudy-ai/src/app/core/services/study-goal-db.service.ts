import { Inject, InjectionToken, Injectable } from '@angular/core';

export interface StudyGoalStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const STUDY_GOAL_STORAGE = new InjectionToken<StudyGoalStorage>(
  'STUDY_GOAL_STORAGE',
  {
    factory: () => {
      if (typeof localStorage !== 'undefined') {
        return localStorage;
      }

      return {
        getItem: () => null,
        setItem: () => undefined,
      };
    },
  },
);

@Injectable({ providedIn: 'root' })
export class StudyGoalDbService {
  private readonly storageKey = 'smartstudy.studyGoal';

  constructor(
    @Inject(STUDY_GOAL_STORAGE) private readonly storage: StudyGoalStorage,
  ) {}

  loadGoal(): string {
    try {
      return this.storage.getItem(this.storageKey) ?? '';
    } catch {
      return '';
    }
  }

  saveGoal(goal: string): void {
    try {
      this.storage.setItem(this.storageKey, goal.trim());
    } catch {
      // Ignore storage errors in local blueprint mode.
    }
  }
}
