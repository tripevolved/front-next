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

export interface PublicDestinationResponse extends DestinationsResponse {
  page: number;
  totalPages: number;
  perPage: number;
}

export interface DestinationsRequestParams {
  search: string;
  uniqueName?: string;
  page: number;
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

export const getPublicDestinations = async ({search = '', uniqueName = '', page = 1}: DestinationsRequestParams) => {
  const route = `destinations/paginated?search=${search}&profile=${uniqueName}&page=${page}`;
  return ApiRequest.get<PublicDestinationResponse>(route).then(serializer);
}
