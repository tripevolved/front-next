import type { TripDetails } from "@/core/types/trip";
import { formatPtBrDateRangeLong, parseDateOnlyToLocalDate } from "@/utils/helpers/dates.helpers";

const MONTH_NAMES = [
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

/**
 * Builds the hero dedication line: "Para Ana", "Para Ana e Bruno", "Para Ana, Bruno e Carla".
 */
export function formatPublicItineraryTravelersLabel(names: string[]): string | null {
  const cleaned = names.map((n) => String(n).trim()).filter(Boolean);
  if (cleaned.length === 0) return null;
  if (cleaned.length === 1) return `Para ${cleaned[0]}`;
  if (cleaned.length === 2) return `Para ${cleaned[0]} e ${cleaned[1]}`;
  const head = cleaned.slice(0, -1).join(", ");
  const last = cleaned[cleaned.length - 1];
  return `Para ${head} e ${last}`;
}

export function formatTripHeroDates(tripDetails: TripDetails): string {
  const config = tripDetails.configuration;
  if (config?.startDate && config?.endDate) {
    const start = parseDateOnlyToLocalDate(config.startDate);
    const end = parseDateOnlyToLocalDate(config.endDate);
    if (!start || !end) return "Datas a definir";
    return formatPtBrDateRangeLong(start, end);
  }
  if (config?.month != null && config.month >= 1 && config.month <= 12) {
    return `Em ${MONTH_NAMES[config.month - 1]}`;
  }
  return "Datas a definir";
}
