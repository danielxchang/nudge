import React, { useState } from "react";

import Container from "./Container";
import Skeleton from "@mui/material/Skeleton";
import classes from "./ImageOverlay.module.css";

interface Props {
  image: string;
  alt: string;
  text: string;
}

const ImageOverlay: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(true);

  const onLoadHandler = () => {
    setLoading(false);
    console.log("Loaded");
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
        {loading ? (
          <Skeleton variant="rectangular">{imageJSX}</Skeleton>
        ) : (
          <React.Fragment>
            {imageJSX}
            <div className={classes.overlay}>{props.text}</div>
          </React.Fragment>
        )}
      </div>
    </Container>
  );
};

export default ImageOverlay;
