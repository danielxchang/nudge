import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from ".//logo.png";
import classes from "./MainNavigation.module.css";

const DUMMY_USER = { id: "u1", name: "Daniel Chang" };

const MainNavigation: React.FC = (props) => {
  return (
    <header>
      <div className={classes.header}>
        <Link to="/" className={classes.logo}>
          <img src={logo} alt="nudge logo" />
          nudge
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink
                to={`/${DUMMY_USER.id}/habits`}
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MainNavigation;
