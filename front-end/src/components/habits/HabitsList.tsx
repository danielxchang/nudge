import React from "react";

interface Habit {
  id: string;
  dateStarted: string;
  description: string;
  count: number;
}

const DUMMY_HABITS: Habit[] = [
  {
    id: "h1",
    dateStarted: new Date().toISOString(),
    description: "Running",
    count: 1,
  },
  {
    id: "h2",
    dateStarted: new Date().toISOString(),
    description: "Reading",
    count: 3,
  },
];

const HabitsList: React.FC = (props) => {
  return (
    <div>
      <ul>
        {DUMMY_HABITS.map((habit) => (
          <p>{habit.description}</p>
        ))}
      </ul>
    </div>
  );
};

export default HabitsList;
