import { LeadWithUid } from "@/types";

export const joinLead = (lead1: any, lead2: any): LeadWithUid => {
  return {
    ref: lead1?.ref || lead2?.ref,
    friends: lead1?.friends ?? lead2?.friends,
    position: lead1?.position ?? lead2?.position,
    uid: lead1?.uid || lead2?.uid,
    name: lead1?.name || lead2?.name,
    email: lead1?.email || lead2?.email,
    phone: lead1?.phone || lead2?.phone,
  };
};
