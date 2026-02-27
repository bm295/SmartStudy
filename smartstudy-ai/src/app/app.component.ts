import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'smartstudy-root',
  standalone: true,
  template: `
    <main>
      <h1>SmartStudy AI</h1>
      <p>{{ subtitle() }}</p>
      <section>
        <strong>Upcoming deadlines:</strong> {{ upcomingDeadlines() }}
      </section>
    </main>
  `,
})
export class AppComponent {
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
