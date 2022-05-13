export interface DailyEntry {
  date: string;
  userSuccess: boolean;
  partnerSuccess: boolean;
}

interface Habit {
  id: string;
  title: string;
  user: string;
  partner?: string;
  startDate?: string;
  entries?: DailyEntry[];
}

export interface HabitOption {
  id: string;
  title: string;
}

export default Habit;
