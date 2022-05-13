import React, { Fragment, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/Auth";
import MyHabits from "./pages/MyHabits";
import WorldHabits from "./pages/WorldHabits";
import Habit from "./pages/Habit";
import AuthContext from "./store/auth-context";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          !authCtx.isLoggedIn ? <Auth /> : <Navigate to="/habits" replace />
        }
      />
      {authCtx.isLoggedIn && (
        <Fragment>
          <Route path="/habits" element={<MyHabits />} />
          <Route path="/habits/:habitId" element={<Habit />} />
          <Route path="/world" element={<WorldHabits />} />
        </Fragment>
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
