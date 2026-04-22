import type { PublicAccommodationRoomRate } from "@/core/types/accommodations";

export type MealPlanKind = "NONE" | "BREAKFAST" | "HALF" | "FULL" | "ALL";

export function mealPlanKindForRate(rate: PublicAccommodationRoomRate): MealPlanKind {
  if (rate.isAllInclusive) return "ALL";
  if (rate.hasFullBoard) return "FULL";
  if (rate.hasHalfBoard) return "HALF";
  if (rate.hasBreakfast) return "BREAKFAST";
  return "NONE";
}

export function mealPlanLabelForKind(kind: MealPlanKind): string {
  switch (kind) {
    case "ALL":
      return "All inclusive";
    case "FULL":
      return "Pensão completa";
    case "HALF":
      return "Meia pensão";
    case "BREAKFAST":
      return "Café da manhã incluído";
    case "NONE":
    default:
      return "Sem café da manhã";
  }
}

export function pickMinRate(rates: PublicAccommodationRoomRate[], match: (r: PublicAccommodationRoomRate) => boolean) {
  const filtered = rates.filter(match);
  if (!filtered.length) return null;
  return filtered.reduce((min, r) => (r.price < min.price ? r : min), filtered[0]);
}

/**
 * Mirrors the candidate-rate selection used in `AccommodationRoomDetailModal`.
 */
export function buildCandidateRatesForRoom(
  availabilityRates: PublicAccommodationRoomRate[],
  selectedRateId?: string | null
): PublicAccommodationRoomRate[] {
  const kinds: MealPlanKind[] = ["NONE", "BREAKFAST", "HALF", "FULL", "ALL"];
  const picked: PublicAccommodationRoomRate[] = [];

  for (const kind of kinds) {
    const pickNoCancel = pickMinRate(availabilityRates, (r) => mealPlanKindForRate(r) === kind && !r.isCancellable);
    const pickCancel = pickMinRate(availabilityRates, (r) => mealPlanKindForRate(r) === kind && r.isCancellable);
    if (pickNoCancel) picked.push(pickNoCancel);
    if (pickCancel) picked.push(pickCancel);
  }

  const selected = selectedRateId ? availabilityRates.find((r) => r.id === selectedRateId) : undefined;
  if (selected) picked.unshift(selected);

  const byId = new Map<string, PublicAccommodationRoomRate>();
  for (const r of picked) {
    if (r?.id) byId.set(r.id, r);
  }
  return Array.from(byId.values());
}
