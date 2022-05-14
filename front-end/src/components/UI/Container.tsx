import * as React from "react";
import MuiContainer from "@mui/material/Container";

interface Props {
  children: React.ReactNode;
  height?: string;
}

const Container: React.FC<Props> = (props) => {
  return (
    <MuiContainer maxWidth="sm" sx={{ height: props.height }}>
      {props.children}
    </MuiContainer>
  );
};

export default Container;
