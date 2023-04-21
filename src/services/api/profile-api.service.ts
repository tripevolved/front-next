import { ApiRequestService } from "./api-request.service";

interface Destination {
  id: string;
  name: string;
  coverImageUrl: string | null;
}

const destinationSerializer = (destination: any): Destination => {
  return {
    id: destination.destinationId as string,
    name: destination.name as string,
    coverImageUrl: typeof destination.coverImageUrl === "string" ? destination.coverImageUrl : null,
  };
};

const getDestinations = async (profileName: string): Promise<Destination[]> => {
  const url = `profiles/${profileName}`;
  return ApiRequestService
    .get(url)
    .then(({ data }) => data)
    .then(({ destinations = [] }) => destinations.map(destinationSerializer));
};

export const ProfileApi = { getDestinations };
