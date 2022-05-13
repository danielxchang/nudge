import { HabitEntry } from "./types";

export const getInitials = (fullName: string) => {
  const nameParts = fullName.split(" ");
  return nameParts.map((n) => n.charAt(0).toUpperCase()).join("");
};

export const combineEntries = (
  startDate: Date,
  userEntries: Date[],
  partnerEntries: Date[]
) => {
  const combinedEntries: HabitEntry[] = [];
  let userIdx = 0;
  let partnerIdx = 0;
  const date = startDate;
  const today = new Date(new Date().toDateString());

  while (date <= today) {
    userIdx = advancePointer(userEntries, userIdx, date);
    partnerIdx = advancePointer(partnerEntries, partnerIdx, date);
    combinedEntries.push({
      date: date.toDateString(),
      userSuccess: userEntries.at(userIdx)?.toString() === date.toString(),
      partnerSuccess:
        partnerEntries.at(partnerIdx)?.toString() === date.toString(),
    });

    date.setDate(date.getDate() + 1);
  }

  return combinedEntries;
};

const advancePointer = (entries: Date[], pointer: number, target: Date) => {
  while (
    entries.length > 0 &&
    pointer < entries.length &&
    entries.at(pointer)! < target
  ) {
    pointer++;
  }
  return pointer;
};
