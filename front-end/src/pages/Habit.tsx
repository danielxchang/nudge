import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DUMMY_HABITS, DUMMY_USER } from "../util/dummy";
import HabitTimeline from "../components/habits/HabitTimeline";
import Container from "../components/UI/Container";
import HabitType, { DailyEntry } from "../models/habit";

const Habit: React.FC = () => {
  const { habitId } = useParams();
  const [habit, setHabit] = useState<HabitType>();

  useEffect(() => {
    const selectedHabit = DUMMY_HABITS.find((h) => h.id === habitId);
    setHabit(selectedHabit);
  }, [habitId]);

  const addDateHandler = (newEntry: DailyEntry) => {
    setHabit((oldHabit) => {
      if (oldHabit) {
        const newHabit = { ...oldHabit };
        if (newHabit.dates.slice(-1)[0].date === newEntry.date) {
          newHabit.dates.pop();
        }
        newHabit.dates.push(newEntry);
        return newHabit;
      }
      return oldHabit;
    });
  };

  return (
    <Container>
      <h1>{habit && habit.description}</h1>
      {habit && (
        <HabitTimeline
          userName={DUMMY_USER.name}
          habit={habit}
          addToday={addDateHandler}
        />
      )}
    </Container>
  );
};

export default Habit;
