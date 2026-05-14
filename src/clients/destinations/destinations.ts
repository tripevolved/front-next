import { DestinationImage } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

interface DestinationItem {
  coverImage: DestinationImage;
  title: string;
  destinationId: string;
  name: string;
  uniqueName: string;
  travelerProfile?: string | null;
}

export interface Destination extends Omit<DestinationItem, "title"> {}

interface DestinationResponse {
  page: number;
  totalPages: number;
  perPage: number;
  destinations: Destination[];
}

interface DestinationsRequestParams {
  /** Omit or pass `null` / `""` to list destinations without a text filter (preload / browse-all). */
  search?: string | null;
  profile: string;
  relatedDestination?: string;
  context?: "ALL" | "CONSULTANCY" | "PLATFORM" | "WEEKEND";
  page?: number;
  limit?: number;
}

export const getDestinations = async ({
  search,
  context = "PLATFORM",
  profile,
  relatedDestination = "",
  page = 1,
  limit = 6,
}: DestinationsRequestParams) => {
  const params = new URLSearchParams();
  params.set("context", context);
  params.set("profile", profile === "all" ? "" : profile);
  params.set("relatedDestination", relatedDestination ?? "");
  params.set("page", String(page));
  params.set("limit", String(limit));
  const q = typeof search === "string" ? search.trim() : "";
  if (q) params.set("search", q);

  const route = `destinations/paginated?${params.toString()}`;
  return ApiRequest.get<DestinationResponse>(route);
};