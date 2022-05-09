import React from "react";

import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import StickyFooter from "./StickyFooter";

interface Props {
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
      <StickyFooter />
    </React.Fragment>
  );
};

export default Layout;
