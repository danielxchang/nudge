import { useContext } from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import "./NavLinks.css";

const NavLinks: React.FC = () => {
  const authCtx = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink
          to={`/habits`}
          // className={({ isActive }) => (isActive && classes.active) || ""}
        >
          Me
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/world"
          // className={({ isActive }) => (isActive && classes.active) || ""}
        >
          World
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          // className={({ isActive }) => (isActive && classes.active) || ""}
          onClick={authCtx.logout}
        >
          Sign Out
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
