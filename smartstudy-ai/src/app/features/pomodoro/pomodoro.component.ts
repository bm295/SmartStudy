import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'smartstudy-pomodoro',
  standalone: true,
  template: `
    <section>
      <h2>Pomodoro Focus Mode</h2>
      <p>Phiên focus hoàn thành hôm nay: {{ focusSessions() }}</p>
      <p>Tổng phút tập trung: {{ focusedMinutes() }}</p>
    </section>
  `,
})
export class PomodoroComponent {
  readonly focusSessions = signal(5);
  readonly minutesPerSession = signal(25);

  readonly focusedMinutes = computed(() => this.focusSessions() * this.minutesPerSession());
}
