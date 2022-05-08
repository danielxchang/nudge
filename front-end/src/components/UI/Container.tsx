import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MuiContainer from "@mui/material/Container";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <MuiContainer maxWidth="sm">{props.children}</MuiContainer>
    </React.Fragment>
  );
};

export default Container;
