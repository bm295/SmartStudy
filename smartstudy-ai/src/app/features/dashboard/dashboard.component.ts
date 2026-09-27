import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudyGoalDbService } from '../../core/services/study-goal-db.service';

@Component({
  selector: 'smartstudy-dashboard',
  standalone: true,
  imports: [RouterLink],
  styles: [`
    .intro { margin-bottom: 30px; }
    .intro p { margin: 0; }
    .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 34px; }
    .stat { padding: 22px; }
    .stat span { display: block; color: #68778d; font-size: .86rem; font-weight: 600; }
    .stat strong { display: block; margin-top: 5px; font-size: 2rem; line-height: 1.2; }
    .section-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
    .section-heading h2 { margin: 0; font-size: 1.4rem; }
    .course-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .course-card { display: block; padding: 24px; color: inherit; text-decoration: none; transition: transform .2s, box-shadow .2s; }
    .course-card:hover { transform: translateY(-3px); box-shadow: 0 12px 30px #21345917; }
    .course-icon { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 11px; background: #eaf0ff; color: #3b63db; font-weight: 800; }
    .course-card:nth-child(2) .course-icon { background: #e9f8f4; color: #15967a; }
    .course-card:nth-child(3) .course-icon { background: #fff1e6; color: #dd8846; }
    .course-card h3 { margin: 18px 0 4px; font-size: 1.12rem; }
    .course-card p { margin: 0; color: #68778d; font-size: .9rem; }
    .progress-track { height: 7px; margin: 22px 0 9px; border-radius: 10px; background: #e9edf4; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: inherit; background: #4a70de; }
    .course-card small { color: #68778d; }
    .course-card .open { display: block; margin-top: 21px; color: #3158ca; font-weight: 700; font-size: .88rem; }
    .goal { margin-top: 34px; padding: 24px; }
    .goal h2 { margin: 0 0 5px; font-size: 1.2rem; }
    .goal p { margin: 0 0 16px; color: #68778d; }
    .goal form { display: flex; gap: 10px; }
    .goal input { flex: 1; min-width: 0; padding: 11px 13px; border: 1px solid #d7dfeb; border-radius: 10px; }
    .current-goal { margin-top: 14px; font-size: .9rem; }
    @media (max-width: 760px) { .summary, .course-grid { grid-template-columns: 1fr; } .goal form { flex-wrap: wrap; } }
  `],
  template: `
    <section class="intro">
      <span class="eyebrow">Your learning space</span>
      <h1 class="page-title">Welcome back to studying.</h1>
      <p class="muted">Choose a subject to practice, or pick up where you left off.</p>
    </section>
    <section class="summary" aria-label="Study summary">
      <div class="panel stat"><span>Subjects</span><strong>{{ subjectProgress().length }}</strong></div>
      <div class="panel stat"><span>Sessions this week</span><strong>{{ totalSessions() }}</strong></div>
      <div class="panel stat"><span>Average progress</span><strong>{{ completionRate() }}%</strong></div>
    </section>
    <section aria-labelledby="courses-title">
      <div class="section-heading"><h2 id="courses-title">Subjects</h2><span class="muted">Sample progress</span></div>
      <div class="course-grid">
        @for (row of subjectProgress(); track row.subject) {
          <a class="panel course-card" routerLink="/flashcards" [attr.aria-label]="'Practice ' + row.subject">
            <span class="course-icon" aria-hidden="true">{{ row.subject.charAt(0) }}</span>
            <h3>{{ row.subject }}</h3>
            <p>Explore the practice questions</p>
            <div class="progress-track" role="progressbar" [attr.aria-label]="row.subject + ' progress'" [attr.aria-valuenow]="row.completedPercent" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" [style.width.%]="row.completedPercent"></div></div>
            <small>{{ row.completedPercent }}% complete</small>
            <span class="open">Open practice →</span>
          </a>
        }
      </div>
    </section>
    <section class="panel goal" aria-labelledby="goal-title">
      <h2 id="goal-title">Your study goal</h2>
      <p>A small goal gives each session a clear direction.</p>
      <form (submit)="saveGoal(); $event.preventDefault()">
        <input aria-label="Study goal" type="text" [value]="draftGoal()" (input)="onGoalInput($event)" placeholder="e.g. Finish Algebra chapter 3 this week" />
        <button class="primary-button" type="submit">Save goal</button>
      </form>
      <div class="current-goal"><strong>Current goal:</strong> {{ currentGoal() || 'Not set yet' }}</div>
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
    return progress.length ? Math.round(progress.reduce((sum, row) => sum + row.completedPercent, 0) / progress.length) : 0;
  });
  onGoalInput(event: Event): void { this.draftGoal.set((event.target as HTMLInputElement | null)?.value ?? ''); }
  saveGoal(): void {
    const goal = this.draftGoal().trim();
    this.goalDb.saveGoal(goal);
    this.currentGoal.set(goal);
  }
}
