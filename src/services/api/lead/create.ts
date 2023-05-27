import { Lead, LeadWithUid } from "@/core/types";
import { ApiRequestService } from "../api-request.service";
import { getByEmail } from "./get-by-email";
import { saveLeadOnList } from "./launch-list";
import { mergeLead } from "./lead.helper";

// Ensure remove ref from response
const createLeadInApi = async ({ ref, ...lead }: Lead) => {
  const url = `customers/create`;
  return ApiRequestService.post<{ id: string }>(url, lead).then(({ data }) => ({
    uid: data.id as string,
    ...lead,
  }));
};

const getOrCreate = async (lead: Lead): Promise<LeadWithUid> => {
  const savedLead = await getByEmail(lead.email).catch(() => null);
  if (savedLead) return mergeLead(savedLead, lead);
  return createLeadInApi(lead)
    .catch(() => getByEmail(lead.email))
    .then((data) => mergeLead(data, lead));
};

export const create = async (lead: Lead & { phone: string }) => {
  const parsedPhone = `+55${lead.phone.replace(/\D/g, "")}`;
  const parsedLead = { ...lead, phone: parsedPhone };

  const leadWithUid = await getOrCreate(parsedLead);
  const launchResult = await saveLeadOnList(leadWithUid);

  const updatedLead = mergeLead(launchResult, leadWithUid) satisfies LeadWithUid;
  return updatedLead;
};
