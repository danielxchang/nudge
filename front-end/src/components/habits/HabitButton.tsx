import React from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar, { AvatarType } from "../UI/Avatar";

import HabitItem from "../../models/habit";

interface Props {
  habit: HabitItem;
  user: { id: string; name: string };
}

const Habit: React.FC<Props> = (props) => {
  let navigate = useNavigate();

  return (
    <ListItemButton
      divider
      onClick={() => navigate(`/${props.user.id}/habits/${props.habit.id}`)}
    >
      <ListItemAvatar>
        <Avatar type={AvatarType.initials} name={props.user.name} />
      </ListItemAvatar>
      <ListItemText
        primary={props.habit.description}
        secondary={`Last entry: ${props.habit.dateStarted}`}
        sx={{ textAlign: "center" }}
      />
      <ListItemAvatar>
        <Avatar type={AvatarType.initials} name={props.habit.partner} />
      </ListItemAvatar>
    </ListItemButton>
  );
};

export default Habit;
