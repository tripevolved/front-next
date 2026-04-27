import { toDateOnlyString } from "@/clients/accommodations";

/** Query keys shared between collection cards and hospedagens detail. */
export const ACCOMMODATION_STAY_QUERY = {
  checkIn: "checkIn",
  checkOut: "checkOut",
  travelerType: "travelerType",
} as const;

/** Parse `YYYY-MM-DD` into a local calendar Date (no UTC shift). */
export function parseStayDateOnlyParam(value: string | null): Date | null {
  if (!value) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  const dt = new Date(y, mo, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

export function buildAccommodationStayQuery(
  checkIn: Date,
  checkOut: Date,
  travelerType: "COUPLE" | "FAMILY"
): string {
  const sp = new URLSearchParams();
  sp.set(ACCOMMODATION_STAY_QUERY.checkIn, toDateOnlyString(checkIn));
  sp.set(ACCOMMODATION_STAY_QUERY.checkOut, toDateOnlyString(checkOut));
  sp.set(ACCOMMODATION_STAY_QUERY.travelerType, travelerType);
  return sp.toString();
}
