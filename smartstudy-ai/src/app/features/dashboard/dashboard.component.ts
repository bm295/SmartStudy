import { Component, computed, inject, signal } from '@angular/core';
import { StudyGoalDbService } from '../../core/services/study-goal-db.service';

@Component({
  selector: 'smartstudy-dashboard',
  standalone: true,
  template: `
    <section>
      <h2>Smart Dashboard</h2>

      <label for="study-goal">Study goal</label>
      <input
        id="study-goal"
        type="text"
        [value]="draftGoal()"
        (input)="onGoalInput($event)"
        placeholder="e.g. Finish Algebra chapter 3 this week"
      />
      <button type="button" (click)="saveGoal()">Save goal</button>

      <p><strong>Current goal:</strong> {{ currentGoal() || 'Not set yet' }}</p>
      <p>Total sessions this week: {{ totalSessions() }}</p>
      <p>Average completion rate: {{ completionRate() }}%</p>
    </section>
  `,
})
export class DashboardComponent {
  private readonly goalDb = inject(StudyGoalDbService);

  readonly currentGoal = signal(this.goalDb.loadGoal());
  readonly draftGoal = signal(this.currentGoal());

  readonly subjectProgress = signal([
    { subject: 'Math', completedPercent: 80 },
    { subject: 'Physics', completedPercent: 60 },
    { subject: 'English', completedPercent: 90 },
  ]);

  readonly totalSessions = signal(14);

  readonly completionRate = computed(() => {
    const progress = this.subjectProgress();
    return Math.round(
      progress.reduce((sum, row) => sum + row.completedPercent, 0) / progress.length,
    );
  });

  onGoalInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.draftGoal.set(input?.value ?? '');
  }

  saveGoal(): void {
    const goal = this.draftGoal().trim();
    this.goalDb.saveGoal(goal);
    this.currentGoal.set(goal);
  }
}
