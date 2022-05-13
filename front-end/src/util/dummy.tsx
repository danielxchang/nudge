import HabitItem, { HabitOption } from "../models/habit";

const populateDates = (startDate: Date) => {
  const date = new Date(startDate.getTime());
  const today = new Date();
  const dates = [];

  while (date < today) {
    const dateEntry = {
      date: new Date(date).toLocaleDateString("en-US"),
      userSuccess: Math.floor(Math.random() * 10) < 7 ? true : false,
      partnerSuccess: Math.floor(Math.random() * 10) < 1 ? true : false,
    };
    dates.push(dateEntry);
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

const d1 = new Date("2022-05-01");

export const DUMMY_USER = { id: "u1", name: "Daniel Chang", loggedIn: true };

export const DUMMY_HABITS: HabitItem[] = [
  {
    id: "h1",
    startDate: new Date().toLocaleDateString("en-US"),
    user: "DC",
    partner: "SC",
    title: "Running",
    entries: populateDates(d1),
  },
  {
    id: "h2",
    startDate: new Date().toLocaleDateString("en-US"),
    user: "DC",
    partner: "JP",
    title: "Reading",
    entries: populateDates(d1),
  },
];

export const DUMMY_OPTIONS: HabitOption[] = [
  { id: "o1", title: "Running" },
  { id: "o2", title: "Reading" },
  { id: "o1", title: "Swimming" },
];
