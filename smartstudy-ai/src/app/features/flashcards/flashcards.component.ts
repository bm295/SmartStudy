import { Component, computed, signal } from '@angular/core';

interface PracticeQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

@Component({
  selector: 'smartstudy-flashcards',
  standalone: true,
  template: `
    <section>
      <h2>Flashcard practice</h2>
      @if (currentQuestion(); as card) {
        <p>Question {{ currentIndex() + 1 }} of {{ questions.length }}</p>
        <h3>{{ card.question }}</h3>
        <div role="group" aria-label="Answer choices">
          @for (option of card.options; track option; let index = $index) {
            <button type="button" [disabled]="selectedIndex() !== null" (click)="chooseAnswer(index)">
              {{ option }}
            </button>
          }
        </div>
        @if (selectedIndex() !== null) {
          <p role="status">
            {{ selectedIndex() === card.correctIndex ? 'Correct!' : 'Not quite.' }}
            {{ card.explanation }}
          </p>
          <button type="button" (click)="nextQuestion()">
            {{ currentIndex() + 1 < questions.length ? 'Next question' : 'Finish practice' }}
          </button>
        }
      } @else {
        <p role="status">Practice complete. You answered {{ correctCount() }} of {{ questions.length }} correctly.</p>
        <button type="button" (click)="restart()">Practice again</button>
      }
    </section>
  `,
})
export class FlashcardsComponent {
  readonly questions: PracticeQuestion[] = [
    {
      question: 'What is a derivative?',
      options: ['The limit of a rate of change', 'The area under a curve', 'A constant value'],
      correctIndex: 0,
      explanation: 'A derivative describes the instantaneous rate at which a function changes.',
    },
    {
      question: 'What does HTTP 401 mean?',
      options: ['Not Found', 'Unauthorized', 'Internal Server Error'],
      correctIndex: 1,
      explanation: 'HTTP 401 means the request lacks valid authentication credentials.',
    },
  ];

  readonly currentIndex = signal(0);
  readonly selectedIndex = signal<number | null>(null);
  readonly correctCount = signal(0);
  readonly currentQuestion = computed(() => this.questions[this.currentIndex()] ?? null);

  chooseAnswer(index: number): void {
    const question = this.currentQuestion();
    if (!question || this.selectedIndex() !== null || index < 0 || index >= question.options.length) return;

    this.selectedIndex.set(index);
    if (index === question.correctIndex) this.correctCount.update((count) => count + 1);
  }

  nextQuestion(): void {
    if (this.selectedIndex() === null) return;
    this.currentIndex.update((index) => index + 1);
    this.selectedIndex.set(null);
  }

  restart(): void {
    this.currentIndex.set(0);
    this.selectedIndex.set(null);
    this.correctCount.set(0);
  }
}
