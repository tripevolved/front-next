import { ApiRequest } from "@/services/api/request";

export interface DestinationCuratorshipSuggestionBody {
  destination: string;
  allowsContact: boolean;
  email?: string;
  phone?: string;
  travelerId?: string;
}

/**
 * POST /api/destinations/suggestions — suggest a missing destination for curatorship.
 */
export const postDestinationCuratorshipSuggestion = async (
  body: DestinationCuratorshipSuggestionBody
): Promise<unknown> => {
  return ApiRequest.post<unknown>("destinations/suggestions", body);
};
