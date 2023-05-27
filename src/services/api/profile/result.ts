import { ApiRequestService } from "../api-request.service";

interface ProfileResultDto {
  id: string;
}

interface ProfileResponse {
  uniqueName: string;
  // destinations: any[];
}

export const getResult = async ({ id: travelerId }: ProfileResultDto) => {
  const url = `profiles/traveler/${travelerId}`;
  return ApiRequestService.get<ProfileResponse>(url).then(({ data }) => ({
    profileSlug: data.uniqueName,
  }));
};
