function formatDate(value: number): string {
  const date = new Date(value);
  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth() + 1;
  const dateMonthDay = date.getDate();

  return `${dateMonth}/${dateMonthDay}/${dateYear}`;
}

export default formatDate;
