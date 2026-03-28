export interface DailyMetrics {
  date: string;
  steps: number;
  stepsGoal: number;
  calories: number;
  caloriesGoal: number;
  activeMinutes: number;
  activeMinutesGoal: number;
  distance: number;
  heartRate: {
    resting: number;
    peak: number;
  };
  sleep: {
    hours: number;
    quality: 'excellent' | 'good' | 'fair' | 'poor';
  };
}

export interface WeeklyActivity {
  day: string;
  steps: number;
  active: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
}
