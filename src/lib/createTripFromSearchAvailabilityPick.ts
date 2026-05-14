import { AccommodationsApiService } from "@/clients/accommodations";
import type { AvailabilityTravelerType } from "@/clients/accommodations";
import { TripsApiService } from "@/clients/trips";
import { buildRoomsInput } from "@/clients/trips/by-accommodation";
import type { FamilyRoom } from "@/components/trip-planning/familyTypes";
import type { PublicAccommodationRoomRate } from "@/core/types/accommodations";

const FALLBACK_UNIQUE_TRANSACTION_VALID_MS = 60 * 60 * 1000;

/**
 * Confirms tariff conditions then creates a trip — same backend contract as
 * `buildAccommodationCheckoutHref` + `createTripFromNovaCheckoutHref`, without building the nova URL.
 */
export async function createTripFromSearchAvailabilityPick(opts: {
  travelerId: string;
  accommodationUniqueName: string;
  /** Batch / by-destination search `transactionId` passed into availability/conditions */
  searchTransactionId: string;
  startDate: string;
  endDate: string;
  travelerType: AvailabilityTravelerType;
  accommodationRoomId: string;
  rate: PublicAccommodationRoomRate;
  familyRooms?: FamilyRoom[];
}): Promise<string> {
  const conditions = await AccommodationsApiService.postAccommodationAvailabilityConditions(opts.accommodationUniqueName, {
    uniqueTransactionId: opts.searchTransactionId,
    vendor: opts.rate.vendor,
    roomRateIds: [opts.rate.id],
  });

  const uniqueTransactionValidUntil =
    conditions.uniqueTransactionValidUntil ?? new Date(Date.now() + FALLBACK_UNIQUE_TRANSACTION_VALID_MS);

  if (!conditions.uniqueTransactionId || !conditions.rates?.[0]) {
    throw new Error("Condições da tarifa indisponíveis.");
  }

  const rooms = buildRoomsInput({
    travelerType: opts.travelerType,
    accommodationRoomId: opts.accommodationRoomId,
    rateId: opts.rate.id,
    vendor: opts.rate.vendor,
    rooms: opts.travelerType === "FAMILY" ? opts.familyRooms : undefined,
  });

  const { id } = await TripsApiService.createTripByAccommodation({
    travelerId: opts.travelerId,
    accommodationUniqueName: opts.accommodationUniqueName,
    uniqueTransactionId: conditions.uniqueTransactionId,
    uniqueTransactionValidUntil,
    startDate: opts.startDate,
    endDate: opts.endDate,
    travelerType: opts.travelerType,
    rooms,
  });

  return id;
}
