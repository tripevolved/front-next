import { Photo } from "@/core/types";
import { ApiRequestService } from "../api-request.service";

interface Destination {
  id: string;
  name: string;
  coverImageUrl: string | null;
}

interface DestinationResponse {
  coverImage: Photo;
  title: string;
  destinationId: string;
  name: string;
  uniqueName: string;
}

const destinationSerializer = (destination: DestinationResponse): Destination => {
  return {
    id: destination.destinationId,
    name: destination.name,
    coverImageUrl: destination.coverImage.sources.find(({ type }) => type === "md")?.url || null,
  };
};

export const getDestinations = async (profileName: string): Promise<Destination[]> => {
  const url = `profiles/${profileName}`;
  return ApiRequestService
    .get(url)
    .then(({ data }) => data)
    .then(({ destinations = [] }) => destinations.map(destinationSerializer));
};
