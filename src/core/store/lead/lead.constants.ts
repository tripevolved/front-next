import type { LeadValue } from "./lead.types";

export const initialLeadValue = {
  id: "",
  email: "",
  name: "",
  phone: undefined,
  launchList: null,
  invitedBy: null,
  profile: null,
} satisfies LeadValue;
