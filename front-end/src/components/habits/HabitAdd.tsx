import React, { useState } from "react";
import Fab from "@mui/material/Fab";

import FormDialog from "../UI/FormDialog";
import getIcon, { StatusIcon } from "../UI/Icons";

const HabitAdd: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleFormHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  const dialogConfig = {
    title: "Add New Habit",
    label: "Habit",
    text: "Select one of the choices below and we'll take care of the rest!",
    successBtnLabel: "Add",
  };

  return (
    <React.Fragment>
      <FormDialog
        open={showForm}
        toggleForm={toggleFormHandler}
        dialogConfig={dialogConfig}
      />
      <Fab
        aria-label="add"
        size="medium"
        sx={{
          backgroundColor: "#ff7f02",
          marginTop: "2rem",
          ":hover": { backgroundColor: "#ec5304" },
        }}
        onClick={toggleFormHandler}
      >
        {getIcon(StatusIcon.Add)}
      </Fab>
    </React.Fragment>
  );
};

export default HabitAdd;
