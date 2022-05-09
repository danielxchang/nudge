import React from "react";
import List from "@mui/material/List";

import HabitButton from "./HabitButton";
import { DUMMY_USER, DUMMY_HABITS } from "../../util/dummy";

const HabitsList: React.FC = () => {
  const user = { id: DUMMY_USER.id, name: DUMMY_USER.name };
  const habitItems = DUMMY_HABITS.map((h) => (
    <HabitButton user={user} habit={h} key={h.id} />
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
