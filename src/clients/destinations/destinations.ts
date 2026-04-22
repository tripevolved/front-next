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
  search?: string;
  profile: string;
  relatedDestination?: string;
  context?: "ALL" | "CONSULTANCY" | "PLATFORM" | "WEEKEND";
  page?: number;
  limit?: number;
}

export const getDestinations = async ({
  search = "",
  context = "PLATFORM",
  profile,
  relatedDestination = "",
  page = 1,
  limit = 6,
}: DestinationsRequestParams) => {
  const params = new URLSearchParams({
    search,
    context,
    profile: profile === "all" ? "" : profile,
    relatedDestination: relatedDestination ?? "",
    page: String(page),
    limit: String(limit)
  });
  const route = `destinations/paginated?${params.toString()}`;
  return ApiRequest.get<DestinationResponse>(route);
};