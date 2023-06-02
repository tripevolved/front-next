import type { LaunchList, Lead } from "@/core/types";

import axios from "axios";

import { sendFormData } from "@/utils/helpers/form.helpers";
import { capitalize } from "@/utils/helpers/strings.helper";

const LAUNCH_LIST_URL = "https://getlaunchlist.com/s/0l3TDN";

const findByEmail = async (email: string): Promise<LaunchList | null> => {
  try {
    const url = `${LAUNCH_LIST_URL}/${email}`;
    const { data } = await axios.get(url, { responseType: "text" });
    return {
      id: String(data.match(/\?ref=(.*)/)?.[1] || ""),
      friends: Number(data.match(/(\d+) friends/, "$1")?.[1] || 0),
      position: Number(data.match(/>#(\d+)/, "$1")?.[1] || 0),
    };
  } catch (error) {
    return null;
  }
};

const parseInvitedBy = (invitedBy: Lead["invitedBy"]) => {
  const result: Record<string, any> = {};
  for (const key in invitedBy) {
    const value = (invitedBy as any)[key];
    if (typeof value === "undefined") continue;
    const newKey = `invitedBy${capitalize(key)}`;
    result[newKey] = value;
  }
  return result;
};

const create = async ({ invitedBy, ...lead }: Lead) => {
  const data = { ...lead, ...parseInvitedBy(invitedBy), ref: invitedBy?.id };
  return sendFormData<Lead>(LAUNCH_LIST_URL, data as any).then(() => findByEmail(lead.email));
};

export const LaunchListService = { create, findByEmail };
