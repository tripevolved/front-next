import type { AvailabilityTravelerType } from "@/clients/accommodations";
import type { FamilyRoom } from "@/components/trip-planning/familyTypes";

export function buildAccommodationCheckoutHref(params: {
  accommodationUniqueName: string;
  /** `PublicAccommodationRoom.id` */
  accommodationRoomId: string;
  startDate: string;
  endDate: string;
  travelerType: AvailabilityTravelerType;
  rooms?: FamilyRoom[] | null;
  rateId: string;
  vendor: string;
  uniqueTransactionId: string;
  /** Parsed API datetime; serialized as ISO-8601 in the query string. */
  uniqueTransactionValidUntil: Date | string;
}): string {
  const sp = new URLSearchParams();
  sp.set("accommodation", params.accommodationUniqueName);
  sp.set("accommodationRoomId", params.accommodationRoomId);
  sp.set("startDate", params.startDate);
  sp.set("endDate", params.endDate);
  sp.set("travelerType", params.travelerType);
  sp.set("rateId", params.rateId);
  sp.set("vendor", params.vendor);
  sp.set("uniqueTransactionId", params.uniqueTransactionId);
  sp.set(
    "uniqueTransactionValidUntil",
    typeof params.uniqueTransactionValidUntil === "string"
      ? params.uniqueTransactionValidUntil
      : params.uniqueTransactionValidUntil.toISOString()
  );
  if (params.travelerType === "FAMILY" && params.rooms && params.rooms.length > 0) {
    sp.set("rooms", JSON.stringify(params.rooms));
  }
  return `/app/checkout?${sp.toString()}`;
}
