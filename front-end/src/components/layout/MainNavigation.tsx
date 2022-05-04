import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from ".//logo.png";
import classes from "./MainNavigation.module.css";

const MainNavigation: React.FC = (props) => {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        <img src={logo} alt="nudge logo" />
        nudge
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              to="/me/habits"
              className={({ isActive }) => (isActive && classes.active) || ""}
            >
              Me
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/world/habits"
              className={({ isActive }) => (isActive && classes.active) || ""}
            >
              World
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive && classes.active) || ""}
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
