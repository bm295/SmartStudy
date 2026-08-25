import { TestBed } from '@angular/core/testing';
import { STUDY_GOAL_STORAGE, StudyGoalDbService } from './study-goal-db.service';

describe('StudyGoalDbService', () => {
  const storage = {
    getItem: vi.fn<(...args: [string]) => string | null>(),
    setItem: vi.fn<(...args: [string, string]) => void>(),
  };

  beforeEach(() => {
    storage.getItem.mockReset();
    storage.setItem.mockReset();

    TestBed.configureTestingModule({
      providers: [
        StudyGoalDbService,
        { provide: STUDY_GOAL_STORAGE, useValue: storage },
      ],
    });
  });

  it('loads the stored goal and falls back to an empty string', () => {
    storage.getItem.mockReturnValueOnce('Finish algebra');

    const service = TestBed.inject(StudyGoalDbService);

    expect(service.loadGoal()).toBe('Finish algebra');
    expect(storage.getItem).toHaveBeenCalledWith('smartstudy.studyGoal');

    storage.getItem.mockReturnValueOnce(null);
    expect(service.loadGoal()).toBe('');
  });

  it('trims and stores the goal', () => {
    const service = TestBed.inject(StudyGoalDbService);

    service.saveGoal('  Read chapter 4  ');

    expect(storage.setItem).toHaveBeenCalledWith(
      'smartstudy.studyGoal',
      'Read chapter 4',
    );
  });

  it('can fall back to the default storage port when no override is provided', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [StudyGoalDbService],
    });

    const service = TestBed.inject(StudyGoalDbService);

    expect(service.loadGoal()).toBe('');
    expect(() => service.saveGoal('  Try again  ')).not.toThrow();
  });
});
