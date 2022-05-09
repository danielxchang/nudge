import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import MyHabits from "./pages/MyHabits";
import WorldHabits from "./pages/WorldHabits";
import Habit from "./pages/Habit";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:userId/habits" element={<MyHabits />} />
      <Route path="/:userId/habits/:habitId" element={<Habit />} />
      <Route path="/world/habits" element={<WorldHabits />} />
    </Routes>
  );
};

export default App;
