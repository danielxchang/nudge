import React from "react";
import MuiAvatar from "@mui/material/Avatar";

export enum AvatarType {
  initials,
  image,
}

const avatarStyles = {
  user: { bgcolor: "#ff7f02" },
  partner: { bgcolor: "#ec5304" },
  image: {},
};

interface Props {
  type: AvatarType;
  name: string;
  person: "user" | "partner";
  source?: string;
}

const Avatar: React.FC<Props> = (props) => {
  const avatarType = props.type;
  const style =
    avatarType === AvatarType.initials
      ? avatarStyles[props.person]
      : avatarStyles.image;

  if (avatarType === AvatarType.initials) {
    return <MuiAvatar sx={style}>{props.name}</MuiAvatar>;
  }

  return <MuiAvatar alt={props.name} sx={style} src={props.source} />;
};

export default Avatar;
