import React from "react";
import MuiAvatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { getInitials } from "../../util/helpers";

export enum AvatarType {
  initials,
  image,
}

const avatarStyles = {
  initials: { bgcolor: deepOrange[500] },
  image: {},
};

interface Props {
  type: AvatarType;
  name: string;
  source?: string;
}

const Avatar: React.FC<Props> = (props) => {
  const avatarType = props.type;
  const style =
    avatarType === AvatarType.initials
      ? avatarStyles.initials
      : avatarStyles.image;

  if (avatarType === AvatarType.initials) {
    return <MuiAvatar sx={style}>{getInitials(props.name)}</MuiAvatar>;
  }

  return <MuiAvatar alt={props.name} sx={style} src={props.source} />;
};

export default Avatar;
