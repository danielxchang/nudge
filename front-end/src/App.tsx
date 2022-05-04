import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import MyHabits from "./pages/MyHabits";
import WorldHabits from "./pages/WorldHabits";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/me/habits" element={<MyHabits />} />
        <Route path="/world/habits" element={<WorldHabits />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
};

export default App;
