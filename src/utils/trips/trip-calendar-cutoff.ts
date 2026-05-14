import { format, subDays } from 'date-fns'

/** Trips on or after this calendar day appear on the dashboard timeline; older trips use `/app/viagens/passadas`. */
export const TRIP_TIMELINE_LOOKBACK_DAYS = 15

export function getTripCalendarCutoffDateString(reference = new Date()): string {
  return format(subDays(reference, TRIP_TIMELINE_LOOKBACK_DAYS), 'yyyy-MM-dd')
}
