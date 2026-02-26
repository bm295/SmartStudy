import { PlannerInput, StudyPlanSuggestion } from '../models/study.models';

export class PlannerService {
  buildPlan(input: PlannerInput): StudyPlanSuggestion {
    const now = new Date();
    const deadline = new Date(input.deadlineISO);
    const diffMs = deadline.getTime() - now.getTime();

    const daysLeft = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    const topicsPerDay = Math.max(1, Math.ceil(input.totalTopics / daysLeft));
    const recommendedSessions = Math.max(1, Math.floor(input.availableMinutesPerDay / 25));

    return {
      daysLeft,
      topicsPerDay,
      recommendedSessions,
    };
  }
}
