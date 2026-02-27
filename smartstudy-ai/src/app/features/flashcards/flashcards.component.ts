import { Component, signal } from '@angular/core';

@Component({
  selector: 'smartstudy-flashcards',
  standalone: true,
  template: `
    <section>
      <h2>Flashcard & Quiz Generator</h2>
      <p>Số flashcard đã tạo: {{ flashcards().length }}</p>
    </section>
  `,
})
export class FlashcardsComponent {
  readonly flashcards = signal([
    { question: 'Định nghĩa đạo hàm?', answer: 'Giới hạn của tỉ số biến thiên.' },
    { question: 'HTTP 401 nghĩa là gì?', answer: 'Unauthorized.' },
  ]);
}
