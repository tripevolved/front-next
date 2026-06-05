import { ApiRequest } from "@/services/api/request";

/**
 * PUT /trips/{tripId}/collection
 */
export const putTripCollection = async ({
  tripId,
  collectionUniqueName,
}: {
  tripId: string;
  collectionUniqueName: string;
}): Promise<void> => {
  const route = `trips/${tripId}/collection`;
  await ApiRequest.put(route, { collectionUniqueName: collectionUniqueName });
};
