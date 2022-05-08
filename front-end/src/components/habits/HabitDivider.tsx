import React from "react";
import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Avatar, { AvatarType } from "../UI/Avatar";
import { deepOrange } from "@mui/material/colors";

import { getInitials } from "../../util/helpers";

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

interface Props {
  user: string;
  partner: string;
}

const HabitDivider: React.FC<Props> = (props) => {
  return (
    <Grid container>
      {/* <Grid item xs>
        <Avatar type={AvatarType.initials} content={getInitials(props.user)} />
      </Grid>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderColor: "transparent" }}
      />
      <Grid item xs>
        <Avatar
          type={AvatarType.initials}
          content={getInitials(props.partner)}
        />
      </Grid> */}
    </Grid>
  );
};

export default HabitDivider;
