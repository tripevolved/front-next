import { ApiRequest } from "@/services/api/request";
import {
  normalizeByCollectionResponse,
  type AccommodationsByCollectionResponse,
} from "./by-collection";

export const getAccommodationsByDestinationAll = async (
  destinationUniqueName: string,
  params?: { offset?: number; limit?: number }
): Promise<AccommodationsByCollectionResponse> => {
  const sp = new URLSearchParams();
  if (typeof params?.offset === "number") sp.set("offset", String(params.offset));
  if (typeof params?.limit === "number") sp.set("limit", String(params.limit));

  const route = `accommodations/${encodeURIComponent(destinationUniqueName)}/by-destination/all${
    sp.toString() ? `?${sp.toString()}` : ""
  }`;
  const raw = await ApiRequest.get<unknown>(route);
  return normalizeByCollectionResponse(raw, params);
};
