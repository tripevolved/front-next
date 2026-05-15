export type AccommodationReservationStatus = "CONFIRMED" | "PENDING" | "CANCELED" | "REJECTED";
export type AccommodationPaymentStatus = "PAID" | "NOT_PAID";

export function accommodationReservationPillClass(status: AccommodationReservationStatus): string {
  if (status === "CONFIRMED") return "bg-green-50 text-green-800 border border-green-200";
  if (status === "PENDING") return "bg-blue-50 text-blue-800 border border-blue-200";
  if (status === "CANCELED") return "bg-secondary-100 text-secondary-700 border border-secondary-200";
  if (status === "REJECTED") return "bg-red-50 text-red-800 border border-red-200";
  return "bg-secondary-50 text-secondary-800 border border-secondary-200";
}

export function accommodationPaymentPillClass(status: AccommodationPaymentStatus): string {
  if (status === "PAID") return "bg-green-50 text-green-800 border border-green-200";
  if (status === "NOT_PAID") return "bg-amber-50 text-amber-900 border border-amber-200";
  return "bg-secondary-50 text-secondary-800 border border-secondary-200";
}

export function translateAccommodationReservationStatus(value?: string | null): string {
  const v = (value ?? "").trim().toUpperCase();
  if (!v) return "—";
  if (v === "CONFIRMED") return "Confirmada";
  if (v === "PENDING") return "Pendente";
  if (v === "CANCELED" || v === "CANCELLED") return "Cancelada";
  if (v === "REJECTED") return "Rejeitada";
  return v;
}

export function translateAccommodationPaymentStatus(value?: string | null): string {
  const v = (value ?? "").trim().toUpperCase();
  if (!v) return "—";
  if (v === "PAID") return "Paga";
  if (v === "NOT_PAID") return "Não paga";
  return v;
}

export function parseReservationStatus(value: unknown): AccommodationReservationStatus | null {
  const v = String(value ?? "").trim().toUpperCase();
  if (v === "CONFIRMED" || v === "PENDING" || v === "CANCELED" || v === "CANCELLED") {
    return v === "CANCELLED" ? "CANCELED" : (v as AccommodationReservationStatus);
  }
  if (v === "REJECTED") return "REJECTED";
  return null;
}

export function parsePaymentStatus(value: unknown): AccommodationPaymentStatus | null {
  const v = String(value ?? "").trim().toUpperCase();
  if (v === "PAID" || v === "NOT_PAID") return v;
  return null;
}
