import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <div
      className={classes[`${props.asOverlay && "loading-spinner__overlay"}`]}
    >
      <div className={classes["lds-dual-ring"]}></div>
    </div>
  );
};

export default LoadingSpinner;
