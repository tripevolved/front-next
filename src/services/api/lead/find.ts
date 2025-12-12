import type { Lead } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

interface LeadApiResponse {
  travelerId: string;
  inviterName: string;
  inviterId: string | null;
}

export const findByEmail = async (email: string): Promise<Lead | null> => {
  try {
    const url = `/customers/${email}/state/public`;
    const data = await ApiRequest.get<LeadApiResponse>(url);
    const { travelerId: id, inviterName: name, inviterId } = data;
    const invitedBy = !inviterId ? null : { id: inviterId };
    return { id, email, name, invitedBy };
  } catch (error) {
    console.info("Email not registered");
    return null;
  }
};
