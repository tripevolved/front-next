import { Photo } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

interface Destination {
  id: string;
  name: string;
  coverImageUrl: string | null;
  href: string;
}

interface DestinationsResponse {
  destinations: DestinationItem[];
}

export interface DestinationItem {
  coverImage: Photo;
  title: string;
  destinationId: string;
  name: string;
  uniqueName: string;
}

export interface PublicDestinationResponse {
  page: number;
  totalPages: number;
  perPage: number;
  destinations: Omit<DestinationItem, "title">[];
}

export interface PublicDestinationsRequestParams {
  search?: string;
  uniqueName: string;
  context?: "ALL" | "CONSULTANCY" | "PLATFORM" | "WEEKEND";
  page?: number;
  limit?: number;
}

export interface DestinationSuggestionBody {
  email?: string;
  travelerId?: string;
  destination?: string;
}

const serializer = ({ destinations }: DestinationsResponse): Destination[] =>
  destinations.map(({ destinationId, name, coverImage, uniqueName }) => ({
    id: destinationId,
    name,
    coverImageUrl: coverImage.sources.find(({ type }) => type === "md")?.url || null,
    href: `/destinos/${uniqueName}`,
  }));

export const getDestinations = async (profileName: string) => {
  const route = `profiles/${profileName}`;
  return ApiRequest.get<DestinationsResponse>(route).then(serializer);
};

export const getPublicDestinations = async ({
  search = "",
  context = "ALL",
  uniqueName,
  page = 1,
  limit = 6,
}: PublicDestinationsRequestParams) => {
  const params = new URLSearchParams({
    search,
    context,
    profile: uniqueName == "all" ? "" : uniqueName,
    page: String(page),
    limit: String(limit)
  });
  const route = `destinations/paginated?${params.toString()}`;
  return ApiRequest.get<PublicDestinationResponse>(route);
};

export const sendDestinationSuggestion = async (data: DestinationSuggestionBody) => {
  const body: DestinationSuggestionBody = { ...data };
  const route = "destinations/suggestion";
  return ApiRequest.post<{ message: string; statusCode: number; messageCode: string }>(route, body);
};
