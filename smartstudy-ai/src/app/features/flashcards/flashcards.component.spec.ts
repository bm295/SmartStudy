import { TestBed } from '@angular/core/testing';
import { FlashcardsComponent } from './flashcards.component';

describe('FlashcardsComponent', () => {
  it('shows feedback and an explanation, then advances to the next question', async () => {
    const fixture = TestBed.createComponent(FlashcardsComponent);
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const answerButtons = element.querySelectorAll('div[role="group"] button');
    (answerButtons[1] as HTMLButtonElement).click();
    await fixture.whenStable();

    expect(element.querySelector('[role="status"]')?.textContent).toContain('Not quite.');
    expect(element.querySelector('[role="status"]')?.textContent).toContain('instantaneous rate');
    expect((answerButtons[0] as HTMLButtonElement).disabled).toBe(true);

    (element.querySelector('section > button') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(element.querySelector('h3')?.textContent).toContain('HTTP 401');
    expect(element.querySelector('[role="status"]')).toBeNull();
  });
});
