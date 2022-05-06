import React from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

import { getInitials } from "../../util/helpers";

interface HabitItem {
  id: string;
  dateStarted: string;
  partner: string;
  description: string;
  count: number;
}

interface Props {
  habit: HabitItem;
  user: { id: string; initials: string };
}

const Habit: React.FC<Props> = (props) => {
  let navigate = useNavigate();

  return (
    <ListItemButton
      key={props.habit.id}
      divider
      onClick={() => navigate(`/${props.user.id}/habits/${props.habit.id}`)}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: deepOrange[500] }} variant="rounded">
          {props.user.initials}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.habit.description}
        secondary={`Last entry: ${props.habit.dateStarted}`}
        sx={{ textAlign: "center" }}
      />
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: deepOrange[500] }} variant="rounded">
          {getInitials(props.habit.partner)}
        </Avatar>
      </ListItemAvatar>
    </ListItemButton>
  );
};

export default Habit;
