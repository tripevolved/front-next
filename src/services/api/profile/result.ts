import { ApiRequestService } from "../api-request.service";

interface ProfileResultDto {
  travelerId: string;
}

interface ProfileResponse {
  uniqueName: string;
}

export const getResult = async ({ travelerId }: ProfileResultDto) => {
  const url = `profiles/traveler/${travelerId}`;
  return ApiRequestService.get<ProfileResponse>(url).then(({ data }) => ({
    profileSlug: data.uniqueName
  }));
};
