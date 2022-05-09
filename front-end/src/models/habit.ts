export interface DailyEntry {
  date: string;
  userSuccess: boolean;
  partnerSuccess: boolean;
}

interface Habit {
  id: string;
  dateStarted: string;
  partner: string;
  description: string;
  count: number;
  dates: DailyEntry[];
}

export interface HabitOption {
  id: string;
  title: string;
}

export default Habit;
