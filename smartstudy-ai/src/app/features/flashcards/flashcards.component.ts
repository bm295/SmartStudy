import { Component, computed, signal } from '@angular/core';

interface PracticeQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const FIRST_QUESTION_INDEX = 0;
const INITIAL_CORRECT_COUNT = 0;

@Component({
  selector: 'smartstudy-flashcards',
  standalone: true,
  styleUrl: './flashcards.component.scss',
  templateUrl: './flashcards.component.html',
})
export class FlashcardsComponent {
  readonly Math = Math;
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

  readonly currentIndex = signal(FIRST_QUESTION_INDEX);
  readonly selectedIndex = signal<number | null>(null);
  readonly correctCount = signal(INITIAL_CORRECT_COUNT);
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
    this.currentIndex.set(FIRST_QUESTION_INDEX);
    this.selectedIndex.set(null);
    this.correctCount.set(INITIAL_CORRECT_COUNT);
  }
}

