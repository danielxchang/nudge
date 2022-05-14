import React from "react";
import "./MainHeader.css";

interface Props {
  children: React.ReactNode;
}

const MainHeader: React.FC<Props> = (props) => {
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
