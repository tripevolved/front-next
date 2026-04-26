import { ApiRequest } from "@/services/api/request";
import type { PublicAccommodationAmenity } from "@/core/types/accommodations";

export type AccommodationByCollectionItem = {
  id: string;
  uniqueName: string;
  title: string;
  subtitle?: string | null;
  destination?: string | null;
  coverImage?: { url: string; shortDescription?: string | null } | null;
  amenities?: PublicAccommodationAmenity[];
  recommendedFor?: string[];
  tags?: string[];
};

export type AccommodationsByCollectionResponse = {
  accommodations: AccommodationByCollectionItem[];
  offset: number;
  limit: number;
  count: number;
  totalCount: number;
};

export const getAccommodationsByCollection = async (
  collectionUniqueName: string,
  params?: { offset?: number; limit?: number }
): Promise<AccommodationsByCollectionResponse> => {
  const sp = new URLSearchParams();
  if (typeof params?.offset === "number") sp.set("offset", String(params.offset));
  if (typeof params?.limit === "number") sp.set("limit", String(params.limit));

  const route = `accommodations/${encodeURIComponent(collectionUniqueName)}/by-collection${
    sp.toString() ? `?${sp.toString()}` : ""
  }`;
  return ApiRequest.get<AccommodationsByCollectionResponse>(route);
};

