import { sendFormData } from "@/helpers/form.helpers";
import { LeadRef, LeadWithUid } from "@/types";
import axios from "axios";

const LAUNCH_LIST_URL = "https://getlaunchlist.com/s/0l3TDN";

export const getRefByEmail = async (email: string): Promise<LeadRef> => {
  const url = `${LAUNCH_LIST_URL}/${email}`;

  const leadRef = await axios.get(url, { responseType: "text" }).then(({ data }) => ({
    email,
    ref: String(data.match(/\?ref=(.*)/)?.[1] || ""),
    friends: Number(data.match(/(\d+) friends/, "$1")?.[1] || 0),
    position: Number(data.match(/>#(\d+)/, "$1")?.[1] || 0),
  }));

  return leadRef;
};

type LeadFormData = Pick<LeadWithUid, "email" | "name" | "phone" | "ref" | "uid">;

export const saveLeadOnList = async ({ email, name, phone, uid, ref }: LeadFormData) => {
  const data = { email, name, phone, uid, ref };
  return sendFormData<LeadFormData>(LAUNCH_LIST_URL, data).then(() => getRefByEmail(email));
};
