import React, { useState, useEffect, useContext } from "react";
import Fab from "@mui/material/Fab";

import FormDialog from "../UI/FormDialog";
import getIcon, { StatusIcon } from "../UI/Icons";
import AuthContext from "../../store/auth-context";

const dialogConfig = {
  title: "Add New Habit",
  label: "Habit",
  text: "Select one of the choices below and we'll take care of the rest!",
  successBtnLabel: "Add",
};

const HabitAdd: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [habitOptions, setHabitOptions] = useState([]);

  const toggleFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/api/habits/options`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `BEARER ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.options) throw new Error(data.message);
        setHabitOptions(data.options);
      })
      .catch((err) => alert(err.message));
  }, [token]);

  return (
    <React.Fragment>
      <FormDialog
        open={showForm}
        toggleForm={toggleFormHandler}
        dialogConfig={dialogConfig}
        options={habitOptions}
      />
      <Fab
        aria-label="add"
        size="medium"
        sx={{
          backgroundColor: "#ff7f02",
          marginTop: "1rem",
          ":hover": { backgroundColor: "#ec5304" },
          zIndex: 0,
        }}
        onClick={toggleFormHandler}
      >
        {getIcon(StatusIcon.Add)}
      </Fab>
    </React.Fragment>
  );
};

export default HabitAdd;
