import { Component, signal } from '@angular/core';
import { PlannerService } from '../../core/services/planner.service';

@Component({
  selector: 'smartstudy-planner',
  standalone: true,
  template: `
    <section>
      <h2>AI Study Planner</h2>
      <p>Days left: {{ plan()?.daysLeft }}</p>
      <p>Topics/day: {{ plan()?.topicsPerDay }}</p>
      <p>Recommended Pomodoro sessions/day: {{ plan()?.recommendedSessions }}</p>
    </section>
  `,
})
export class PlannerComponent {
  private readonly plannerService = new PlannerService();

  readonly plan = signal(
    this.plannerService.buildPlan({
      subject: 'Algorithms',
      totalTopics: 24,
      deadlineISO: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
      availableMinutesPerDay: 120,
    }),
  );
}
