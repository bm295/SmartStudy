import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'smartstudy-dashboard',
  standalone: true,
  template: `
    <section>
      <h2>Dashboard thông minh</h2>
      <p>Tổng phiên học tuần này: {{ totalSessions() }}</p>
      <p>Tỉ lệ hoàn thành trung bình: {{ completionRate() }}%</p>
    </section>
  `,
})
export class DashboardComponent {
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
}
