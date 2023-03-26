import { sendFormData } from "@/helpers/form.helpers";
import { ensureNotSlashEnds } from "@/helpers/url.helper";
import axios from "axios";
import { LocalStorageService } from "../store/local-storage.service";

export interface Lead {
  name: string;
  email: string;
  phone: string;
}

const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
const ACTION_URL = "https://getlaunchlist.com/s/0l3TDN";
const KEY_LEAD = "lead";

const createLeadInApi = async (lead: Lead) => {
  const url = `${API_URL}/api/customers/create`;
  return axios
    .post(url, lead)
    .then(({ data }) => LocalStorageService.saveJson(KEY_LEAD, { uid: data.id, ...lead }))
    .catch((error) => console.error(error));
};

const create = async ({ name, email, phone }: Lead) => {
  const parsedPhone = `+55${phone.replace(/\D/g, "")}`;
  const lead = { name, email, phone: parsedPhone };
  LocalStorageService.saveJson(KEY_LEAD, lead);
  return Promise.all([sendFormData<Lead>(ACTION_URL, lead), createLeadInApi(lead)]);
};

export const LeadApiService = { create };
