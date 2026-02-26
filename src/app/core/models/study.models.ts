export interface StudyTask {
  id: string;
  subject: string;
  title: string;
  estimateMinutes: number;
  completed: boolean;
  deadlineISO: string;
}

export interface PlannerInput {
  subject: string;
  totalTopics: number;
  deadlineISO: string;
  availableMinutesPerDay: number;
}

export interface StudyPlanSuggestion {
  daysLeft: number;
  topicsPerDay: number;
  recommendedSessions: number;
}
