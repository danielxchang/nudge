import React from "react";

import HabitAdd from "../components/habits/HabitAdd";
import HabitsList from "../components/habits/HabitsList";
import Layout from "../components/layout/Layout";

const MyHabits: React.FC = () => {
  return (
    <Layout>
      <h1>My Habits</h1>
      <HabitsList />
      <HabitAdd />
    </Layout>
  );
};

export default MyHabits;
