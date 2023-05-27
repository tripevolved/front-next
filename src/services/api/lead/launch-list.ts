import { sendFormData } from "@/utils/helpers/form.helpers";
import { LeadRef, LeadWithUid } from "@/core/types";
import axios from "axios";

const LAUNCH_LIST_URL = "https://getlaunchlist.com/s/0l3TDN";

export const getRefByEmail = async (email: string): Promise<LeadRef> => {
  const url = `${LAUNCH_LIST_URL}/${email}`;

  const leadRef = await axios.get(url, { responseType: "text" }).then(({ data }) => ({
    email,
    ref: String(data.match(/\?ref=(.*)/)?.[1] || ""),
    friends: Number(data.match(/(\d+) friends/, "$1")?.[1] || 0),
    position: Number(data.match(/>#(\d+)/, "$1")?.[1] || 0),
    affiliateId: "",
    referredEmail: "",
  }));

  return leadRef;
};

export const saveLeadOnList = async (data: LeadWithUid) => {
  return sendFormData<LeadWithUid>(LAUNCH_LIST_URL, data as any).then(() => getRefByEmail(data.email));
};
