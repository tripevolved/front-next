import type { LeadValue } from "./lead.types";

export const initialLeadValue = {
  affiliateId: "",
  referralEmail: "",
  email: "",
  name: "",
  phone: "",
  ref: "",
  friends: 0,
  position: 0,
  uid: undefined,
} satisfies LeadValue;
