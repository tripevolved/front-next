import { ApiRequestService } from "../api-request.service";

interface LeadResponse {
  travelerId: string;
  inviterName: string;
  inviterId: string | null;
}

export const getByEmail = async (email: string): Promise<LeadResponse> => {
  const url = `/customers/${email}/state/public`;
  return ApiRequestService.get<LeadResponse>(url).then(({ data }) => data);
};
