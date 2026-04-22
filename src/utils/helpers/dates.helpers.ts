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

/**
 * Parses date-only strings like "2026-05-26" as a local Date (year/month/day),
 * avoiding timezone shifting that happens with `new Date("YYYY-MM-DD")`.
 *
 * Also accepts ISO strings with time and Date instances.
 */
export const parseDateOnlyToLocalDate = (value: unknown): Date | null => {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value !== "string") return null;

  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) {
    const y = Number(m[1]);
    const mo = Number(m[2]);
    const d = Number(m[3]);
    const asLocal = new Date(y, mo - 1, d);
    return Number.isNaN(asLocal.getTime()) ? null : asLocal;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const ptBrMonthLong = new Intl.DateTimeFormat("pt-BR", { month: "long" });

function formatPtBrDay2(date: Date): string {
  return String(date.getDate()).padStart(2, "0");
}

function formatPtBrMonthLong(date: Date): string {
  return ptBrMonthLong.format(date);
}

/**
 * Formats a date range into the PT-BR long form used in the product, handling
 * month/year changes:
 * - "26 a 27 de maio de 2026"
 * - "26 de maio a 02 de junho de 2026"
 * - "28 de dezembro de 2026 a 07 de janeiro de 2027"
 */
export const formatPtBrDateRangeLong = (start: Date, end: Date): string => {
  const d1 = formatPtBrDay2(start);
  const d2 = formatPtBrDay2(end);

  const m1 = formatPtBrMonthLong(start);
  const m2 = formatPtBrMonthLong(end);

  const y1 = start.getFullYear();
  const y2 = end.getFullYear();

  if (y1 === y2 && start.getMonth() === end.getMonth()) {
    if (start.getDate() === end.getDate()) return `${d1} de ${m1} de ${y1}`;
    return `${d1} a ${d2} de ${m1} de ${y1}`;
  }

  if (y1 === y2) {
    return `${d1} de ${m1} a ${d2} de ${m2} de ${y1}`;
  }

  return `${d1} de ${m1} de ${y1} a ${d2} de ${m2} de ${y2}`;
};
