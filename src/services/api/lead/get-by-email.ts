import type { LeadWithUid } from "@/core/types";
import { ApiRequestService } from "../api-request.service";
import { getRefByEmail } from "./launch-list";
import { LeadLocalService } from "./local";
import { joinLead } from "./lead.helper";

interface LeadResponse {
  travelerId: string;
  inviterName: string;
  inviterId: string | null;
}

export const getByEmail = async (email: string): Promise<LeadWithUid> => {
  const url = `/customers/${email}/state/public`;
  const leadRef = await getRefByEmail(email);
  const leadWithUid = await ApiRequestService.get<LeadResponse>(url).then(({ data }) => {
    const leadPartial = { uid: data.travelerId, name: data.inviterName };
    return joinLead(leadPartial, leadRef);
  });
  LeadLocalService.save(leadWithUid);
  return leadWithUid;
};
