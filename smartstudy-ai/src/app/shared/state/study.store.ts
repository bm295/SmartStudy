import { computed, signal } from '@angular/core';
import { StudyTask } from '../../core/models/study.models';

export class StudyStore {
  private readonly tasksSignal = signal<StudyTask[]>([]);
  private readonly xpSignal = signal(0);

  readonly tasks = this.tasksSignal.asReadonly();
  readonly xp = this.xpSignal.asReadonly();

  readonly completionRate = computed(() => {
    const tasks = this.tasksSignal();
    if (!tasks.length) return 0;

    const done = tasks.filter((task) => task.completed).length;
    return Math.round((done / tasks.length) * 100);
  });

  addTask(task: StudyTask): void {
    this.tasksSignal.update((prev) => [...prev, task]);
  }

  completeTask(taskId: string): void {
    this.tasksSignal.update((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task,
      ),
    );
    this.xpSignal.update((value) => value + 10);
  }
}
