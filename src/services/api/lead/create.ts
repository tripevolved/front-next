import type { Lead, LeadCreateDTO } from "@/core/types";
import { ApiRequestService } from "../api-request.service";
import { getByEmail } from "./get-by-email";
import { LaunchListService } from "../../launch-list";

interface LeadApiResponse {
  id: string;
}

const createLeadInApi = async (data: LeadCreateDTO): Promise<Lead> => {
  const url = `customers/create`;
  const id = await ApiRequestService.post<LeadApiResponse>(url, data).then(
    (response) => response.data.id
  );

  const { inviterId, affiliateId, inviterEmail, inviterName, ...rest } = data;

  const invitedBy = { id: inviterId, email: inviterEmail, name: inviterName, affiliateId };

  return { id, invitedBy, ...rest };
};

export const create = async (data: LeadCreateDTO) => {
  const foundLead = await getByEmail(data.email);
  if (foundLead) return foundLead;

  data.phone = `+55${data.phone.replace(/\D/g, "")}`;
  const newLead = await createLeadInApi(data);
  const launchList = await LaunchListService.create(newLead);
  return { ...newLead, launchList };
};
