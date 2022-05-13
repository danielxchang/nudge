import React from "react";
import List from "@mui/material/List";

import HabitButton from "./HabitButton";
import Habit from "../../models/habit";

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
        width: "50%",
        bgcolor: "background.paper",
        maxHeight: "60vh",
        overflow: "auto",
        margin: "auto",
      }}
    >
      {habitItems}
    </List>
  );
};

export default HabitsList;
