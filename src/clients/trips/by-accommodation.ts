import { ApiRequest } from "@/services/api/request";
import { UserService } from "@/services/user";
import type { AvailabilityTravelerType } from "@/clients/accommodations";
import type { FamilyRoom } from "@/components/trip-planning/familyTypes";
import {
  TravelerType,
  type CreateTripRoom,
  type CreateTripTravelers,
} from "@/core/types/trip";

export type CreateTripByAccommodationDto = {
  travelerId: string;
  uniqueTransactionId: string;
  /** Instant until which `uniqueTransactionId` is valid (serialized as ISO-8601 on the wire). */
  uniqueTransactionValidUntil: Date;
  accommodationUniqueName: string;
  /** `PublicAccommodationRoom.id` */
  accommodationRoomId: string;
  rateId: string;
  vendor: string;
  startDate: string;
  endDate: string;
  travelerType: AvailabilityTravelerType;
  rooms?: FamilyRoom[];
};

export type CreateTripByAccommodationRequestBody = {
  travelerId: string;
  uniqueTransactionId: string;
  /** JSON body uses ISO-8601 string for the backend datetime field. */
  uniqueTransactionValidUntil: string;
  accommodationUniqueName: string;
  accommodationRoomId: string;
  rateId: string;
  vendor: string;
  startDate: string;
  endDate: string;
  travelers: CreateTripTravelers;
};

export type CreatedTripByAccommodation = {
  id: string;
};

function buildTravelersForAccommodation(
  travelerType: AvailabilityTravelerType,
  rooms?: FamilyRoom[]
): CreateTripTravelers {
  if (travelerType === "COUPLE") {
    const room: CreateTripRoom = {
      type: TravelerType.COUPLE,
      adults: 2,
      children: 0,
      childrenAges: [],
    };
    return {
      type: TravelerType.COUPLE,
      adults: 2,
      children: 0,
      childrenAges: [],
      rooms: [room],
    };
  }

  const famRooms = rooms?.length ? rooms : [];
  const adults = famRooms.reduce((sum, r) => sum + r.adults, 0);
  const children = famRooms.reduce((sum, r) => sum + r.children, 0);
  const childrenAges = famRooms.flatMap((r) => r.childrenAges ?? []);
  const tripRooms: CreateTripRoom[] = famRooms.map((r) => ({
    type: TravelerType.FAMILY,
    adults: r.adults,
    children: r.children,
    childrenAges: r.childrenAges ?? [],
  }));

  return {
    type: TravelerType.FAMILY,
    adults,
    children,
    childrenAges,
    rooms: tripRooms,
  };
}

export const createTripByAccommodation = async (
  body: CreateTripByAccommodationDto
): Promise<CreatedTripByAccommodation> => {
  const travelers = buildTravelersForAccommodation(body.travelerType, body.rooms);

  const payload: CreateTripByAccommodationRequestBody = {
    travelerId: body.travelerId,
    uniqueTransactionId: body.uniqueTransactionId,
    uniqueTransactionValidUntil: body.uniqueTransactionValidUntil.toISOString(),
    accommodationUniqueName: body.accommodationUniqueName,
    accommodationRoomId: body.accommodationRoomId,
    rateId: body.rateId,
    vendor: body.vendor,
    startDate: body.startDate,
    endDate: body.endDate,
    travelers,
  };

  const { id } = await ApiRequest.post<CreatedTripByAccommodation>(
    "trips/by-accommodation",
    payload
  );
  await UserService.updateTravelerState();
  return { id };
};
