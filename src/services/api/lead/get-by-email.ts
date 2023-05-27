import type { Lead } from "@/core/types";
import { ApiRequestService } from "../api-request.service";
import { LaunchListService } from "@/services/launch-list";

interface LeadApiResponse {
  travelerId: string;
  inviterName: string;
  inviterId: string | null;
}

export const getByEmail = async (email: string): Promise<Lead | null> => {
  try {
    const url = `/customers/${email}/state/public`;
    const { data } = await ApiRequestService.get<LeadApiResponse>(url);
    const { travelerId: id, inviterName: name, inviterId } = data;
    const invitedBy = !inviterId ? null : { id: inviterId };
    const launchList = await LaunchListService.get(email);
    return { id, email, name, launchList, invitedBy };
  } catch (error) {
    return null;
  }
};
