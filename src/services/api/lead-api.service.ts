import { sendFormData } from "@/helpers/form.helpers";
import { ensureNotSlashEnds } from "@/helpers/url.helper";
import { Lead, LeadRef } from "@/types";
import axios from "axios";
import { LocalStorageService } from "../store/local-storage.service";

const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
const LAUNCH_LIST_URL = "https://getlaunchlist.com/s/0l3TDN";
const KEY_LEAD = "lead";

const createLeadInApi = async (lead: Lead) => {
  const url = `${API_URL}/api/customers/create`;
  return axios
    .post(url, lead)
    .then(({ data }) => LocalStorageService.saveJson(KEY_LEAD, { uid: data.id, ...lead }))
    .catch((error) => console.error(error));
};

const getRef = async (lead: Lead): Promise<LeadRef> => {
  const url = `${LAUNCH_LIST_URL}/${lead.email}`;
  return axios.get(url, { responseType: "text" }).then(({ data }) => ({
    ref: String(data.match(/\?ref=(.*)/)?.[1] || ""),
    friends: Number(data.match(/(\d+) friends/, "$1")?.[1] || 0),
    position: Number(data.match(/>#(\d+)/, "$1")?.[1] || 0),
  }));
};

const create = async ({ name, email, phone }: Lead) => {
  const parsedPhone = `+55${phone.replace(/\D/g, "")}`;

  const lead = { name, email, phone: parsedPhone };
  await sendFormData<Pick<Lead, "email" | "name" | "phone">>(LAUNCH_LIST_URL, lead);

  const ref = await getRef(lead);

  const leadRef = { ...ref, ...lead };
  await createLeadInApi(leadRef),

  LocalStorageService.saveJson(KEY_LEAD, leadRef);

  return leadRef;
};

const getLocal = () => LocalStorageService.getJson<Lead>(KEY_LEAD);

export const LeadApiService = { create, getLocal, getRef };
