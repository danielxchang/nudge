import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import IconButton from "@mui/material/IconButton";
import AvatarGroup from "@mui/material/AvatarGroup";

import Avatar, { AvatarType } from "../UI/Avatar";
import getIcon, { StatusIcon } from "../UI/Icons";
import Habit, { DailyEntry } from "../../models/habit";

interface Props {
  userName: string;
  habit: Habit;
  addToday: (newEntry: DailyEntry) => void;
}

type DotColor = "success" | "grey" | "warning";

const HabitTimeline: React.FC<Props> = (props) => {
  const today = new Date().toLocaleDateString("en-US");
  const todayHabit = props.habit.dates.find((d) => d.date === today);
  const completedToday = todayHabit && todayHabit.userSuccess;

  const onClickHandler = () => {
    const lastEntry = props.habit.dates.slice(-1)[0];
    const newEntry = {
      date: today,
      userSuccess: true,
      partnerSuccess: lastEntry.date === today && lastEntry.partnerSuccess,
    };
    props.addToday(newEntry);
  };

  const addBtnContent = (
    <TimelineItem key="addBtn">
      <TimelineOppositeContent
        sx={{ m: "auto 0" }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {completedToday ? "" : "Today"}
      </TimelineOppositeContent>

      <TimelineSeparator>
        <TimelineConnector
          sx={{ borderColor: "transparent", backgroundColor: "transparent" }}
        />
        <TimelineDot color={completedToday ? "grey" : "primary"}>
          <IconButton
            size="small"
            color={completedToday ? "default" : "primary"}
            aria-label="add entry"
            disabled={completedToday}
            onClick={onClickHandler}
          >
            {getIcon(
              completedToday ? StatusIcon.FinishedToday : StatusIcon.Add
            )}
          </IconButton>
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent></TimelineContent>
    </TimelineItem>
  );

  const dailyEntries = props.habit.dates.map((d) => {
    let status;
    let dotColor: DotColor;
    if (d.userSuccess && d.partnerSuccess) {
      status = StatusIcon.AllDone;
      dotColor = "success";
    } else if (d.userSuccess || d.partnerSuccess) {
      status = StatusIcon.Partial;
      dotColor = "warning";
    } else {
      status = StatusIcon.Incomplete;
      dotColor = "grey";
    }

    const avatarGroup = (
      <AvatarGroup max={2}>
        {d.userSuccess && (
          <Avatar type={AvatarType.initials} name={props.userName} />
        )}
        {d.partnerSuccess && (
          <Avatar type={AvatarType.initials} name={props.habit.partner} />
        )}
      </AvatarGroup>
    );

    return (
      <TimelineItem key={d.date}>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {d.date}
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color={dotColor}>{getIcon(status)}</TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent sx={{ py: "12px", marginLeft: 0 }}>
          {avatarGroup}
        </TimelineContent>
      </TimelineItem>
    );
  });

  dailyEntries.reverse();

  const startIconContent = (
    <TimelineItem key="startIcon">
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot color="grey">{getIcon(StatusIcon.Start)}</TimelineDot>
        <TimelineConnector
          sx={{ borderColor: "transparent", backgroundColor: "transparent" }}
        />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}></TimelineContent>
    </TimelineItem>
  );

  return (
    <Timeline sx={{ maxHeight: "50vh", overflowY: "scroll" }}>
      {addBtnContent}
      {dailyEntries}
      {startIconContent}
    </Timeline>
  );
};

export default HabitTimeline;
