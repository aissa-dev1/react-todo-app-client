import formatDate from "./format-date";
import formatTime from "./format-time";

function formatDateAndTime(value: number): string {
  return `${formatDate(value)} | ${formatTime(value)}`;
}

export default formatDateAndTime;
