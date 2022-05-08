import * as React from "react";

import Container from "./Container";
import classes from "./ImageOverlay.module.css";

interface Props {
  image: string;
  alt: string;
  text: string;
}

const ImageOverlay: React.FC<Props> = (props) => {
  return (
    <Container>
      <div className={classes.container}>
        <img src={props.image} alt={props.alt} className={classes.image} />
        <div className={classes.overlay}>{props.text}</div>
      </div>
    </Container>
  );
};

export default ImageOverlay;
