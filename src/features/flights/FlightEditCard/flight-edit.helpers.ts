import { format, parseISO } from "date-fns";

export const formatPrice = (price?: number) => {
  return price && (price < 1000 ? price.toFixed(0) : (price / 1000).toFixed(3));
};

export const extractDayFromDate = (date: string): number => {
  const day = new Date(date).getDate();

  return Number(day) || 0;
};

export const extractCityName = (location?: string) => {
  const parts = location && location.split(" - ");
  return parts && parts.length > 1 ? parts[1] : parts?.[0] ?? "";
};

export const getHourOfFlight = (flightTime?: string) => {
  const flightTimeRemovedSeconds = flightTime && flightTime.slice(0, -3);

  return flightTimeRemovedSeconds;
};

export const capitalizeFirstLetter = (string: string) => {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayOfWeek}, ${day} de ${month} de ${year}`;
};

export const convertDate = (dateString: string): string => {
  const parsedDate = parseISO(dateString);

  return format(parsedDate, "dd/MM/yyyy");
};
