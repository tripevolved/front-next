export const toDateOnly = (date: Date | null | undefined) => {
  if (date === undefined || date === null) return null;

  return new Date(date.toDateString());
};

export const toDateOnlyString = (date: Date) => {
  if (date === undefined || date === null) return "";
  if (typeof date !== typeof Date) return new Date(date).toDateString();

  return date.toDateString();
};

export const toFullDate = (date: Date | null | undefined) => {
  if (date === undefined || date === null) return null;

  let newDate = new Date(date);
  return `${newDate.toLocaleDateString()} - ${newDate.toLocaleTimeString()}`;
};

export const toFullDetailedDate = (date: Date | null | undefined) => {
  if (date === undefined || date === null) return null;

  let newDate = new Date(date);
  return `${newDate.toLocaleDateString()} às ${newDate.toLocaleTimeString([], {
    hour: "2-digit",
  })}h`;
};

export const toLocaleShortDateOnlyString = (date: Date) => {
  if (date === undefined || date === null) return "";
  if (typeof date !== typeof Date) return new Date(date).toLocaleDateString();

  return date.toLocaleDateString();
};

export const toTimeOnlyString = (date: Date) => {
  if (date === undefined || date === null) return "";
  if (typeof date !== typeof Date)
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const normalizeDateString = (date: string) =>
  date.replace(/([a-z.]{2,})/g, (match: string) => {
    let result = "";
    for (const c of match) {
      if (c === ".") continue;
      result += result ? c : c.toUpperCase();
    }
    return result;
  });

export const parseDateToInputFormat = (newDate: Date): string => {
  const month =
    String(newDate.getMonth()).length == 1 ? `0${newDate.getMonth()}` : newDate.getMonth();
  const day = String(newDate.getDate()).length == 1 ? `0${newDate.getDate()}` : newDate.getDate();

  return `${newDate.getFullYear()}-${month}-${day}`;
};

export const parseIsoToBRString = (value = "") =>
  value.replace(/(\d{4})-(\d{2})-(\d{2}).*/, "$3/$2/$1");

export const parseBRStringToDate = (value: string) => {
  const [day, month, year] = value.split("/");
  const iso = `${year}-${Number(month)}-${Number(day)}`;
  return new Date(iso);
};
