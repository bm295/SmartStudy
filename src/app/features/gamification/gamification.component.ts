import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'smartstudy-gamification',
  standalone: true,
  template: `
    <section>
      <h2>Gamification</h2>
      <p>XP hiện tại: {{ xp() }}</p>
      <p>Level: {{ level() }}</p>
      <p>Badge mới nhất: {{ latestBadge() }}</p>
    </section>
  `,
})
export class GamificationComponent {
  readonly xp = signal(420);
  readonly badges = signal(['First Pomodoro', '7-day Streak', 'Quiz Master']);

  readonly level = computed(() => Math.floor(this.xp() / 100) + 1);
  readonly latestBadge = computed(() => this.badges().at(-1) ?? 'No badge');
}
