import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import HabitTimeline from "../habits/HabitTimeline";
import Container from "../UI/Container";
import HabitType from "../../models/habit";
import Layout from "../layout/Layout";
import BreadCrumbs from "../UI/BreadCrumbs";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";

const HabitPageContent: React.FC = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { habitId } = useParams();
  const [habit, setHabit] = useState<HabitType>();

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/api/habits/${habitId}`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `BEARER ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.partner) throw new Error();
        setHabit(data);
      })
      .catch((err) => navigate("/habits"));
  }, [habitId, token, navigate]);

  const addDateHandler = () => {
    const url = `${process.env.REACT_APP_API_URL}/api/habits/${habitId}`;

    fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `BEARER ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) throw new Error(data.message);
        setHabit((prevHabit) => {
          return { ...prevHabit!, entries: data.entries };
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Layout>
      {habit && <BreadCrumbs pageTitle={habit.title} />}
      <Container>
        {!habit && <LoadingSpinner />}
        {habit && (
          <React.Fragment>
            <h1>{habit.title}</h1>
            <HabitTimeline
              userName={habit.user}
              habit={habit}
              addToday={addDateHandler}
            />
          </React.Fragment>
        )}
      </Container>
    </Layout>
  );
};

export default HabitPageContent;
