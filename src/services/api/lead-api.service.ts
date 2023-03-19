import { sendFormData } from "@/helpers/form.helpers";
// import { ensureNotSlashEnds } from "@/helpers/url.helper";
// import axios from "axios";

export interface Lead {
  name: string;
  email: string;
  phone: string;
}

const ACTION_URL = "https://getlaunchlist.com/s/0l3TDN";
// const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
// const url = `${API_URL}/api/create`

const create = async (lead: Lead) => {
  return Promise.all([
    sendFormData<Lead>(ACTION_URL, lead),
    // axios.post(url, lead),
  ]);
}

export const LeadApiService = { create };
