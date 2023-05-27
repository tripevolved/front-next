import { sendFormData } from "@/utils/helpers/form.helpers";
import { LaunchList, Lead } from "@/core/types";
import axios from "axios";

const LAUNCH_LIST_URL = "https://getlaunchlist.com/s/0l3TDN";

const getRefByEmail = async (email: string): Promise<LaunchList | null> => {
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

const saveLeadOnList = async (data: Lead) => {
  return sendFormData<Lead>(LAUNCH_LIST_URL, data as any).then(() => getRefByEmail(data.email));
};

export const LaunchListService = { create: saveLeadOnList, get: getRefByEmail };
