import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from ".//logo.png";
import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/auth-context";

const MainNavigation: React.FC = (props) => {
  const authCtx = useContext(AuthContext);
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
                to={`/habits`}
                className={({ isActive }) => (isActive && classes.active) || ""}
              >
                Me
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/world"
                className={({ isActive }) => (isActive && classes.active) || ""}
              >
                World
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive && classes.active) || ""}
                onClick={authCtx.logout}
              >
                Sign Out
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MainNavigation;
