import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MuiContainer from "@mui/material/Container";

interface Props {
  children: React.ReactNode;
  height?: string;
}

const Container: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <MuiContainer maxWidth="sm" sx={{ height: props.height }}>
        {props.children}
      </MuiContainer>
    </React.Fragment>
  );
};

export default Container;
