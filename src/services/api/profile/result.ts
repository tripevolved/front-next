import { ApiRequest } from "@/services/api/request";

interface ProfileResultDto {
  id: string;
}

interface ProfileResponse {
  uniqueName: string;
  // destinations: any[];
}

export const getResult = async ({ id: travelerId }: ProfileResultDto) => {
  const route = `profiles/traveler/${travelerId}`;
  return ApiRequest.get<ProfileResponse>(route).then(({ uniqueName }) => ({
    profileSlug: uniqueName,
  }));
};
