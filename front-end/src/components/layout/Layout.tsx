import React from "react";

import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
