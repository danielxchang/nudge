import React from "react";
import { useNavigate } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar, { AvatarType } from "../UI/Avatar";

import "./HabitButton.css";
import HabitItem from "../../models/habit";

interface Props {
  habit: HabitItem;
  user: string;
}

const Habit: React.FC<Props> = (props) => {
  let navigate = useNavigate();

  return (
    <ListItemButton
      divider
      onClick={() => navigate(`/habits/${props.habit.id}`)}
      disabled={!props.habit.partner}
    >
      <ListItemAvatar>
        <Avatar type={AvatarType.initials} name={props.user} person="user" />
      </ListItemAvatar>
      <ListItemText primary={props.habit.title} sx={{ textAlign: "center" }} />
      {props.habit.partner && (
        <ListItemAvatar>
          <Avatar
            type={AvatarType.initials}
            name={props.habit.partner}
            person="partner"
          />
        </ListItemAvatar>
      )}
      {!props.habit.partner && (
        <ListItemAvatar>
          <Avatar type={AvatarType.initials} name="TBD" person="partner" />
        </ListItemAvatar>
      )}
    </ListItemButton>
  );
};

export default Habit;
