import { TripStay, TripStayReservation, TripHotelListTransaction } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export interface RoomAccomodation extends Omit<Accomodation, "system" | "rooms"> {}

interface Accomodation {
  id?: string;
  code?: string;
  signature?: string;
  provider?: string;
  system: string;
  rooms: RoomAccomodation[];
}

export interface TripHotelDTO {
  uniqueTransactionId?: string;
  tripItineraryActionId?: string;
  accommodations: Accomodation[];
}

export interface AccommodationBody extends Omit<TripHotelDTO, "accommodations"> {
  accommodation: Accomodation;
}

export const getStayByTripId = async (tripId: string, tripItineraryActionId: string = "") => {
  const route = `stays/${tripId}/${tripItineraryActionId}`;
  const tripStay = await ApiRequest.get<TripStay>(route);
  return tripStay;
};

export const getAllReservedStaysByTripId = async (tripId: string) => {
  const route = `stays/${tripId}/reservations`;
  const tripStays = await ApiRequest.get<TripStayReservation[]>(route);
  return tripStays;
};

export const getTripHotelsToEditByTripId = async (
  tripId: string,
  tripItineraryActionId: string
) => {
  const route = `stays/${tripId}/options?accommodationActionId=${tripItineraryActionId}`;
  const tripHotels = await ApiRequest.post<TripHotelListTransaction>(route, {});
  // const tripHotels: TripHotelListTransaction = {
  //   uniqueTransactionId: 'some-random-id',
  //   curated: [{
  //     id: "1",
  //     code: 'code-01',
  //     signature: 'sign01',
  //     provider: 'provider01',
  //     system: 'system01',
  //     coverImage: {
  //       title:'cover-img-title-01',
  //       alt: 'alt-img-01',
  //       sources: [{
  //         url: '',
  //         type: 'md',
  //         width: 400,
  //         height: 400
  //     }]
  //     },
  //     name: 'curated 01',
  //     tags: "clean",
  //     cancellationInfo: 'no cancellation',
  //     isSelected: true,
  //     details: {
  //       images: [
  //         {
  //           title: "details img",
  //           alt: "string",
  //           sources: [
  //             {
  //               "url": "/",
  //               "type": 'md',
  //               "width": 0,
  //               "height": 0
  //             }
  //           ]
  //         }
  //       ],
  //       information: "information string",
  //       checkInHour: "14:00",
  //       address: "string",
  //       "numAdults": 2,
  //       "numChildren": 0,
  //       "numDays": 3,
  //       "services": [
  //         {
  //           "title": "cama",
  //           "type": 'bed'
  //         }
  //       ],
  //       "rooms": [
  //         {
  //           "id": "string",
  //           "code": "string",
  //           "signature": "string",
  //           "provider": "string",
  //           "coverImageUrl": "string",
  //           "title": "string",
  //           "subtitle": "string",
  //           "isSelected": true,
  //           "price": 0,
  //           "currency": "string",
  //           "boardChoice": 'AI',
  //           "details": {
  //             "information": "string",
  //             "amenities": [
  //               "string"
  //             ]
  //           },
  //           "amenities": [
  //             {
  //               "title": "caf'e da manha",
  //               "type": 'breakfast'
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   }, {
  //     id: "2",
  //     code: 'code-01',
  //     signature: 'sign01',
  //     provider: 'provider01',
  //     system: 'system01',
  //     coverImage: {
  //       title:'cover-img-title-01',
  //       alt: 'alt-img-01',
  //       sources: [{
  //         url: '',
  //         type: 'md',
  //         width: 400,
  //         height: 400
  //     }]
  //     },
  //     name: 'curated 02',
  //     tags: "clean, cheap",
  //     cancellationInfo: 'no cancellation',
  //     isSelected: false,
  //     details: {
  //       images: [
  //         {
  //           title: "details img",
  //           alt: "string",
  //           sources: [
  //             {
  //               "url": "/",
  //               "type": 'md',
  //               "width": 0,
  //               "height": 0
  //             }
  //           ]
  //         }
  //       ],
  //       information: "information string",
  //       checkInHour: "14:00",
  //       address: "string",
  //       "numAdults": 2,
  //       "numChildren": 0,
  //       "numDays": 3,
  //       "services": [
  //         {
  //           "title": "cama",
  //           "type": 'bed'
  //         }
  //       ],
  //       "rooms": [
  //         {
  //           "id": "string",
  //           "code": "string",
  //           "signature": "string",
  //           "provider": "string",
  //           "coverImageUrl": "string",
  //           "title": "string",
  //           "subtitle": "string",
  //           "isSelected": true,
  //           "price": 0,
  //           "currency": "string",
  //           "boardChoice": 'AI',
  //           "details": {
  //             "information": "string",
  //             "amenities": [
  //               "string"
  //             ]
  //           },
  //           "amenities": [
  //             {
  //               "title": "caf'e da manha",
  //               "type": 'breakfast'
  //             }
  //           ]
  //         }
  //       ]
  //     }}
  //   ],
  //   others: []
  // };
  return tripHotels;
};

export const getHotelDetails = async (tripId: string, accommodationData: AccommodationBody) => {
  const route = `stays/${tripId}/options/details`;
  const hotelDetails = await ApiRequest.post<TripStay>(route, accommodationData);
  return hotelDetails;
};

export const setTripHotelToStay = async (tripId: string, body: TripHotelDTO) => {
  const route = `stays/${tripId}/edit`;
  const tripHotels = await ApiRequest.put(route, body);
  return tripHotels;
};
