import { Photo } from "@/core/types";
import { ApiRequest } from "@/clients/common/request";

interface DestinationItem {
  coverImage: Photo;
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
  uniqueName: string;
  context?: "ALL" | "CONSULTANCY" | "PLATFORM" | "WEEKEND";
  page?: number;
  limit?: number;
}

export const getDestinations = async ({
  search = "",
  context = "PLATFORM",
  uniqueName,
  page = 1,
  limit = 6,
}: DestinationsRequestParams) => {
  const params = new URLSearchParams({
    search,
    context,
    profile: uniqueName == "all" ? "" : uniqueName,
    page: String(page),
    limit: String(limit)
  });
  const route = `destinations/paginated?${params.toString()}`;
  return ApiRequest.get<DestinationResponse>(route);
};