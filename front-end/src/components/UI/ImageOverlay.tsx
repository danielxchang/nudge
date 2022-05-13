import React, { useState } from "react";

import Container from "./Container";
import classes from "./ImageOverlay.module.css";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  image: string;
  alt: string;
  text: string;
}

const ImageOverlay: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(true);

  const onLoadHandler = () => {
    setLoading(false);
  };

  const imageJSX = (
    <img
      src={props.image}
      alt={props.alt}
      className={classes.image}
      onLoad={onLoadHandler}
    />
  );

  return (
    <Container>
      <div className={classes.container}>
        {imageJSX}
        {loading && <LoadingSpinner />}
        <div className={classes.overlay}>{props.text}</div>
      </div>
    </Container>
  );
};

export default ImageOverlay;
