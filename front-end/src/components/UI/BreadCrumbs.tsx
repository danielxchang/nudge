import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { DUMMY_USER } from "../../util/dummy";

interface Props {
  pageTitle?: string;
}

const BreadCrumbs: React.FC<Props> = (props) => {
  const breadcrumbs = [
    <RouterLink
      to={`/${DUMMY_USER.id}/habits`}
      style={{
        color: "inherit",
        textDecoration: "none",
      }}
      key="1"
    >
      My Habits
    </RouterLink>,
    <Typography key="2" color="text.primary">
      {props.pageTitle}
    </Typography>,
  ];

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
