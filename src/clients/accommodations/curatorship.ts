import { ApiRequest } from "@/services/api/request";
import type {
  PublicAccommodationHighlight,
  PublicAccommodationMustKnow,
} from "@/core/types/accommodations";

export interface AccommodationCuratorship {
  uniqueName: string;
  title: string;
  subtitle: string | null;
  curatorshipPhrase: string | null;
  highlights: PublicAccommodationHighlight[];
  mustKnows: PublicAccommodationMustKnow[];
}

export const getAccommodationCuratorship = async (
  uniqueName: string
): Promise<AccommodationCuratorship> => {
  const route = `accommodations/${encodeURIComponent(uniqueName)}/curatorship`;
  return ApiRequest.get<AccommodationCuratorship>(route);
};
