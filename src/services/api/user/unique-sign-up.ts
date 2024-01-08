import type { Lead, LeadCreateDTO } from "@/core/types";
import { findByEmail } from "../lead/find";
import { ApiRequest } from "@/services/api/request";

interface LeadApiResponse {
  id: string;
  uniqueId: string;
}

const postUniqueSignUp = async (data: LeadCreateDTO): Promise<Lead> => {
  const url = `users/unique-sign-up`;
  const { id, uniqueId } = await ApiRequest.post<LeadApiResponse>(url, data);
  const { inviterId, affiliateId, inviterEmail, inviterName, ...rest } = data;
  const invitedBy = { id: inviterId, email: inviterEmail, name: inviterName, affiliateId };
  return { id, uniqueId, invitedBy, ...rest };
};

export const uniqueSignUp = async (data: LeadCreateDTO) => {
  const foundLead = await findByEmail(data.email);
  if (foundLead) return foundLead;

  data.phone = `+55${data.phone.replace(/\D/g, "")}`;
  return await postUniqueSignUp(data);
};
