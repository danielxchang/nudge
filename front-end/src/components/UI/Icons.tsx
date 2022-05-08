import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import AddIcon from "@mui/icons-material/Add";
import StartIcon from "@mui/icons-material/Start";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export enum StatusIcon {
  FinishedToday,
  Partial,
  AllDone,
  Incomplete,
  Score,
  Start,
  Add,
}

const getIcon = (status: StatusIcon) => {
  switch (status) {
    case StatusIcon.FinishedToday:
      return <AssignmentTurnedInIcon />;
    case StatusIcon.Partial:
      return <DoneIcon />;
    case StatusIcon.AllDone:
      return <DoneAllIcon />;
    case StatusIcon.Incomplete:
      return <DonutLargeIcon />;
    case StatusIcon.Score:
      return <ScoreboardIcon />;
    case StatusIcon.Start:
      return <StartIcon />;
    case StatusIcon.Add:
      return <AddIcon sx={{ color: "white" }} />;
  }
};

export default getIcon;
