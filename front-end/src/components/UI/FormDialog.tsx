import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Highlights from "./Highlights";
import { HabitOption } from "../../models/habit";
import AuthContext from "../../store/auth-context";

interface Props {
  open: boolean;
  toggleForm: () => void;
  dialogConfig: {
    title: string;
    text: string;
    label: string;
    successBtnLabel: string;
  };
  options: HabitOption[];
}

const FormDialog: React.FC<Props> = (props) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const onCloseHandler = () => {
    props.toggleForm();
  };

  const onAddHandler = () => {
    const inputEl = document.getElementById(
      "highlights-input"
    )! as HTMLInputElement;

    if (inputEl.value === "") return;

    // Add post request to API logic here
    const url = `${process.env.REACT_APP_API_URL}/api/habits/new`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({ optionInput: inputEl.value }),
      headers: {
        Authorization: `BEARER ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) throw new Error(data.message);
        navigate(`/habits/${data.habitId}`);
      })
      .catch((err) => alert(err.message));
    props.toggleForm();
  };

  return (
    <Dialog open={props.open} onClose={onCloseHandler}>
      <DialogTitle>{props.dialogConfig.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.dialogConfig.text}</DialogContentText>
        <Highlights
          options={props.options}
          label={`${props.dialogConfig.label}s`}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandler}>Cancel</Button>
        <Button onClick={onAddHandler}>
          {props.dialogConfig.successBtnLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
