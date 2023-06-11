import type { Lead, LeadCreateDTO } from "@/core/types";
import { findByEmail } from "./find";
import { LaunchListService } from "@/services/launch-list";
import { ApiRequest } from "@/services/api/request";

interface LeadApiResponse {
  id: string;
}

const postLead = async (data: LeadCreateDTO): Promise<Lead> => {
  const url = `customers/create`;
  const { id } = await ApiRequest.post<LeadApiResponse>(url, data);
  const { inviterId, affiliateId, inviterEmail, inviterName, ...rest } = data;
  const invitedBy = { id: inviterId, email: inviterEmail, name: inviterName, affiliateId };
  return { id, invitedBy, ...rest };
};

export const create = async (data: LeadCreateDTO) => {
  const foundLead = await findByEmail(data.email);
  if (foundLead) return foundLead;

  data.phone = `+55${data.phone.replace(/\D/g, "")}`;
  const newLead = await postLead(data);
  const launchList = await LaunchListService.create(newLead);
  return { ...newLead, launchList };
};
