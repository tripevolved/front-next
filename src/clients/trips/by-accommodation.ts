import { ApiRequest } from "@/services/api/request";
import { UserService } from "@/services/user";
import type { AvailabilityTravelerType } from "@/clients/accommodations";
import type { FamilyRoom } from "@/components/trip-planning/familyTypes";

export type CreateTripByAccommodationDto = {
  travelerId: string;
  uniqueTransactionId: string;
  /** Instant until which `uniqueTransactionId` is valid (serialized as ISO-8601 on the wire). */
  uniqueTransactionValidUntil: Date;
  accommodationUniqueName: string;
  startDate: string;
  endDate: string;
  travelerType: AvailabilityTravelerType;
  rooms: CreateTripByAccommodationRoomInput[];
};

export type CreateTripByAccommodationRequestBody = {
  travelerId: string;
  uniqueTransactionId: string;
  /** JSON body uses ISO-8601 string for the backend datetime field. */
  uniqueTransactionValidUntil: string;
  accommodationUniqueName: string;
  startDate: string;
  endDate: string;
  travelerType: AvailabilityTravelerType;
  rooms: CreateTripByAccommodationRoomInput[];
};

export type CreatedTripByAccommodation = {
  id: string;
};

export type CreateTripByAccommodationRoomInput = {
  adults: number;
  children: number;
  childrenAges: number[];
  rateId: string;
  /** `PublicAccommodationRoom.id` */
  accommodationRoomId: string;
  vendor: string;
};

export function buildRoomsInput(params: {
  travelerType: AvailabilityTravelerType;
  accommodationRoomId: string;
  rateId: string;
  vendor: string;
  rooms?: FamilyRoom[];
}): CreateTripByAccommodationRoomInput[] {
  if (params.travelerType === "COUPLE") {
    return [
      {
        adults: 2,
        children: 0,
        childrenAges: [],
        rateId: params.rateId,
        accommodationRoomId: params.accommodationRoomId,
        vendor: params.vendor,
      },
    ];
  }

  const famRooms = params.rooms?.length ? params.rooms : [];
  return famRooms.map((r) => ({
    adults: r.adults,
    children: r.children,
    childrenAges: r.childrenAges ?? [],
    rateId: params.rateId,
    accommodationRoomId: params.accommodationRoomId,
    vendor: params.vendor,
  }));
}

export const createTripByAccommodation = async (
  body: CreateTripByAccommodationDto
): Promise<CreatedTripByAccommodation> => {
  const payload: CreateTripByAccommodationRequestBody = {
    travelerId: body.travelerId,
    uniqueTransactionId: body.uniqueTransactionId,
    uniqueTransactionValidUntil: body.uniqueTransactionValidUntil.toISOString(),
    accommodationUniqueName: body.accommodationUniqueName,
    startDate: body.startDate,
    endDate: body.endDate,
    travelerType: body.travelerType,
    rooms: body.rooms,
  };

  const { id } = await ApiRequest.post<CreatedTripByAccommodation>(
    "trips/by-accommodation",
    payload
  );
  await UserService.updateTravelerState();
  return { id };
};
