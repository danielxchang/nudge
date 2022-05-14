import React, { useState, useEffect, useContext, Fragment } from "react";

import HabitAdd from "./HabitAdd";
import HabitsList from "./HabitsList";
import Layout from "../layout/Layout";
import Habit from "../../models/habit";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";

const MyHabitsPageContent: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loadedHabits, setLoadedHabits] = useState(false);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/api/habits`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `BEARER ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) throw new Error(data.message);
        setHabits(data.habits);
        setLoadedHabits(true);
      })
      .catch((err) => alert(err.message));
  }, [token]);

  return (
    <Layout>
      <h1>My Habits</h1>
      {!loadedHabits && <LoadingSpinner />}
      {loadedHabits && (
        <Fragment>
          <HabitsList habits={habits} />
          <HabitAdd />
        </Fragment>
      )}
    </Layout>
  );
};

export default MyHabitsPageContent;
