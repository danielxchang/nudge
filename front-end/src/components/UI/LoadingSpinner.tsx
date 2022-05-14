import React from "react";
import classes from "./LoadingSpinner.module.css";

interface Props {
  asOverlay?: boolean;
}

const LoadingSpinner: React.FC<Props> = (props) => {
  return (
    <div
      className={classes[`${props.asOverlay && "loading-spinner__overlay"}`]}
    >
      <div className={classes["lds-dual-ring"]}></div>
    </div>
  );
};

export default LoadingSpinner;
