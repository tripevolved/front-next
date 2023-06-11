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

interface DestinationItem {
  coverImage: Photo;
  title: string;
  destinationId: string;
  name: string;
  uniqueName: string;
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
