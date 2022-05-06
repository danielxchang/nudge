import React from "react";
import List from "@mui/material/List";

import Habit from "./Habit";
import { getInitials } from "../../util/helpers";

interface Habit {
  id: string;
  dateStarted: string;
  partner: string;
  description: string;
  count: number;
}

const DUMMY_USER = { id: "u1", name: "Daniel Chang" };
const DUMMY_HABITS: Habit[] = [
  {
    id: "h1",
    dateStarted: new Date().toLocaleDateString("en-US"),
    partner: "Lisa Ann",
    description: "Running",
    count: 1,
  },
  {
    id: "h2",
    dateStarted: new Date().toLocaleDateString("en-US"),
    partner: "Eva Notty",
    description: "Reading",
    count: 3,
  },
];

const HabitsList: React.FC = (props) => {
  const userInitials = getInitials(DUMMY_USER.name);
  const user = { id: DUMMY_USER.id, initials: userInitials };
  const habitItems = DUMMY_HABITS.map((h) => <Habit user={user} habit={h} />);

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        maxHeight: "50%",
        overflow: "auto",
      }}
    >
      {habitItems}
    </List>
  );
};

export default HabitsList;
