export const toDateOnly = (date: Date | null | undefined) => {
  if (date === undefined || date === null) return null;

  return new Date(date.toDateString());
};

export const toDateOnlyString = (date: Date) => {
  if (date === undefined || date === null) return "";

  return date.toDateString();
};

export const toFullDate = (date: Date | null | undefined) => {
  if (date === undefined || date === null) return null;

  let newDate = new Date(date);
  return `${newDate.toLocaleDateString()} - ${newDate.toLocaleTimeString()}`; 
};
