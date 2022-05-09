import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { DUMMY_OPTIONS } from "../../util/dummy";
import Highlights from "./Highlights";

interface Props {
  open: boolean;
  toggleForm: () => void;
  dialogConfig: {
    title: string;
    text: string;
    label: string;
    successBtnLabel: string;
  };
}

const FormDialog: React.FC<Props> = (props) => {
  const onCloseHandler = () => {
    props.toggleForm();
  };

  const onAddHandler = () => {
    const inputEl = document.getElementById(
      "highlights-input"
    )! as HTMLInputElement;

    if (inputEl.value === "") return;

    // Add post request to API logic here
    console.log(inputEl.value);
    props.toggleForm();
  };

  return (
    <Dialog open={props.open} onClose={onCloseHandler}>
      <DialogTitle>{props.dialogConfig.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.dialogConfig.text}</DialogContentText>
        <Highlights
          habitOptions={DUMMY_OPTIONS}
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
