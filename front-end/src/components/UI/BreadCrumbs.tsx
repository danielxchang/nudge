import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface Props {
  pageTitle?: string;
}

const BreadCrumbs: React.FC<Props> = (props) => {
  const breadcrumbs = [
    <RouterLink
      to={`/habits`}
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
      sx={{
        marginLeft: "1rem",
      }}
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
