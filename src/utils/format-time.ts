function formatTime(value: number): string {
  const date = new Date(value);
  const hours = date.getHours();
  const hoursText = hours < 10 ? `0${hours}` : `${hours}`;
  const minutes = date.getMinutes();
  const minutesText = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const timeType = hours >= 12 ? "pm" : "am";

  return `${hoursText}:${minutesText} ${timeType.toUpperCase()}`;
}

export default formatTime;
