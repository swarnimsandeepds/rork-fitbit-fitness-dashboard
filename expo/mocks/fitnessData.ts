import { DailyMetrics, WeeklyActivity } from '@/types/fitness';

export const mockDailyMetrics: DailyMetrics = {
  date: new Date().toISOString(),
  steps: 8234,
  stepsGoal: 10000,
  calories: 2145,
  caloriesGoal: 2500,
  activeMinutes: 42,
  activeMinutesGoal: 60,
  distance: 6.2,
  heartRate: {
    resting: 62,
    peak: 145,
  },
  sleep: {
    hours: 7.2,
    quality: 'good',
  },
};

export const mockWeeklyActivity: WeeklyActivity[] = [
  { day: 'Mon', steps: 9234, active: true },
  { day: 'Tue', steps: 12456, active: true },
  { day: 'Wed', steps: 7891, active: true },
  { day: 'Thu', steps: 11234, active: true },
  { day: 'Fri', steps: 6789, active: false },
  { day: 'Sat', steps: 14567, active: true },
  { day: 'Sun', steps: 8234, active: true },
];
