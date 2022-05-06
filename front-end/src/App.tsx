import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import MyHabits from "./pages/MyHabits";
import WorldHabits from "./pages/WorldHabits";
import Settings from "./pages/Settings";
import StickyFooter from "./components/layout/StickyFooter";

const App = () => {
  return (
    <React.Fragment>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:userId/habits" element={<MyHabits />} />
          <Route path="/:userId/habits/:habitId" element={<WorldHabits />} />
          <Route path="/world/habits" element={<WorldHabits />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
      <StickyFooter />
    </React.Fragment>
  );
};

export default App;
