import { sendFormData } from "@/helpers/form.helpers";
import { ensureNotSlashEnds } from "@/helpers/url.helper";
import { Lead, LeadRef } from "@/types";
import axios from "axios";
import { LocalStorageService } from "../store/local-storage.service";

const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
const LAUNCH_LIST_URL = "https://getlaunchlist.com/s/0l3TDN";
const KEY_LEAD = "lead";

const createLeadInApi = async (lead: Pick<Lead, "email" | "name" | "phone">) => {
  const url = `${API_URL}/api/customers/create`;
  return axios
    .post<{ id: string }>(url, lead)
    .then(({ data }) => ({ uid: data.id as string, ...lead }))
    .catch(() => ({ uid: "" }));
};

const getRefByEmail = async (email: string): Promise<LeadRef> => {
  const url = `${LAUNCH_LIST_URL}/${email}`;

  const leadRef = await axios.get(url, { responseType: "text" }).then(({ data }) => ({
    ref: String(data.match(/\?ref=(.*)/)?.[1] || ""),
    friends: Number(data.match(/(\d+) friends/, "$1")?.[1] || 0),
    position: Number(data.match(/>#(\d+)/, "$1")?.[1] || 0),
  }));

  LocalStorageService.saveJson(KEY_LEAD, leadRef);

  return leadRef;
};

const create = async (lead: Lead) => {
  const localLead = getLocal();
  if (localLead && lead.email === localLead.email) return localLead;

  const parsedPhone = `+55${lead.phone.replace(/\D/g, "")}`;
  const parsedLead = { ...lead, phone: parsedPhone };

  const { uid } = await createLeadInApi(parsedLead);

  const leadWithUid = { uid, ...parsedLead };
  type LeadFormData = Pick<Lead, "email" | "name" | "phone" | "ref" | "uid">;
  await sendFormData<LeadFormData>(LAUNCH_LIST_URL, leadWithUid);

  const launchResult = await getRefByEmail(leadWithUid.email);
  const updatedLead = { ...parsedLead, ...launchResult };
  LocalStorageService.saveJson(KEY_LEAD, updatedLead);

  return updatedLead;
};

const getLocal = () => LocalStorageService.getJson<Lead>(KEY_LEAD);

export const LeadApiService = { create, getLocal, getRefByEmail };
