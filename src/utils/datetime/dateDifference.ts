import moment from "moment";

export const durationSinceCreated = (created_at: Date) => {
  const currentTime = moment();
  const differenceInSeconds = currentTime.diff(created_at, "seconds");
  const duration = moment.duration(differenceInSeconds, "seconds");
  const units: moment.unitOfTime.Base[] = [
    "years",
    "months",
    "days",
    "hours",
    "minutes",
  ];

  for (let i = 0; i < units.length; i++) {
    const value = Math.floor(duration.as(units[i]));
    if (value > 0) {
      return `${value}${units[i].charAt(0)}`;
    }
  }
  return "0m";
};
