import { useAppStore } from "@/core/store";
import { LeadApiService } from "@/services/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const LeadProvider = ({ children }: { children: React.ReactNode }) => {
  const { leadCreate, leadUpdate, lead } = useAppStore();
  const { query } = useRouter();
  const { inviter: inviterName, email: inviterEmail, ref: inviterId, affiliateId } = query;

  useEffect(() => {
    if (!lead.fetched || !!lead.uid) {
      const email = lead.email || LeadApiService.getLocal()?.email;
      if (!email) return;
      LeadApiService.getByEmail(email).then(leadCreate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!affiliateId && !inviterId) return;
    const inviterIsMe = lead.email === inviterEmail || lead.launchList?.id === inviterId;
    if (inviterIsMe) return;

    const invitedBy = {
      ...lead.invitedBy,
      id: normalizeQueryValue(inviterId),
      email: normalizeQueryValue(inviterEmail),
      name: normalizeQueryValue(inviterName),
      affiliateId: normalizeQueryValue(affiliateId),
    };
    leadUpdate({ invitedBy });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [affiliateId, inviterId]);

  return <>{children}</>;
};

const normalizeQueryValue = (value?: string | string[]) => (value ? String(value) : undefined);
