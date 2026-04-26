import { ApiRequest } from "@/services/api/request";

export type TravelerType = "COUPLE" | "FAMILY";

export interface CollectionImage {
  url: string;
  shortDescription: string | null;
}

export interface Collection {
  uniqueName: string;
  title: string;
  subtitle: string;
  description: string;
  isAvailableForPublic: boolean;
  images: CollectionImage[];
  travelerType: TravelerType;
  travelerProfile: string | null;
}

export interface GetCollectionsParams {
  travelerType?: TravelerType;
  search?: string;
  travelerProfile?: string;
  offset?: number;
  limit?: number;
}

export interface CollectionsResponse {
  collections: Collection[];
  offset: number;
  limit: number;
  count: number;
  totalCount: number;
}

export const getCollections = async ({
  travelerType = "COUPLE",
  search,
  travelerProfile,
  offset,
  limit,
}: GetCollectionsParams = {}): Promise<CollectionsResponse> => {
  const params = new URLSearchParams();
  params.set("travelerType", travelerType);

  if (search) params.set("search", search);
  if (travelerProfile) params.set("travelerProfile", travelerProfile);
  if (typeof offset === "number") params.set("offset", String(offset));
  if (typeof limit === "number") params.set("limit", String(limit));

  const route = `collections?${params.toString()}`;
  return ApiRequest.get<CollectionsResponse>(route);
};

export const getCollectionByUniqueName = async (uniqueName: string): Promise<Collection> => {
  const route = `collections/${uniqueName}`;
  return ApiRequest.get<Collection>(route);
};

