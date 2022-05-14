import React from "react";
import List from "@mui/material/List";

import HabitButton from "./HabitButton";
import Habit from "../../models/habit";
import Container from "../UI/Container";

interface HabitsListProps {
  habits: Habit[];
}

const HabitsList: React.FC<HabitsListProps> = ({ habits }) => {
  const habitItems = habits.map((h) => (
    <HabitButton user={h.user} habit={h} key={h.id} />
  ));

  return (
    <List
      sx={{
        width: "60%",
        bgcolor: "background.paper",
        overflow: "auto",
        maxHeight: "70%",
        margin: "auto",
      }}
    >
      {habitItems}
    </List>
  );
};

export default HabitsList;
