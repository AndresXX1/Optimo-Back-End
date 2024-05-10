export const DateConverter = (date: Date) => {
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  return { date: day, month: month, year: year };
};
