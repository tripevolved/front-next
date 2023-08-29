import { useAppStore } from "@/core/store";
import { LeadApiService } from "@/services/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const LeadProvider = ({ children }: { children: React.ReactNode }) => {
  const lead = useAppStore((state) => state.lead);
  const leadCreate = useAppStore((state) => state.leadCreate);
  const leadUpdate = useAppStore((state) => state.leadUpdate);

  const router = useRouter();

  const invitedBy = {
    name: normalizeQueryValue(router.query.inviter),
    email: normalizeQueryValue(router.query.email),
    id: normalizeQueryValue(router.query.ref),
    affiliateId: normalizeQueryValue(router.query.affiliateId),
  };

  const hasLeadData = Boolean(lead.fetched && lead.email);

  const tryFindLead = async (email: string) => {
    try {
      const dataLead = await LeadApiService.getByEmail(email)
      if (dataLead) leadCreate(dataLead);
      else router.replace("/");
    } catch (error) {
      router.replace("/");
    }
  };

  useEffect(() => {
    if (!/inscrito/.test(location.pathname)) return;
    if (!invitedBy.email) return;
    if (hasLeadData) return;
    tryFindLead(invitedBy.email);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitedBy.email]);

  useEffect(() => {
    if (!lead.fetched || !!lead.uid) {
      const email = lead.email || LeadApiService.getLocal()?.email;
      if (email) tryFindLead(email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!invitedBy.affiliateId && !invitedBy.id) return;

    const inviterIsMe =
      (lead.email && lead.email === invitedBy.email) ||
      (lead.launchList?.id && lead.launchList.id === invitedBy.id);

    if (inviterIsMe) return;

    leadUpdate({ invitedBy: { ...lead.invitedBy, ...invitedBy } });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitedBy.affiliateId, invitedBy.id]);

  return <>{children}</>;
};

const normalizeQueryValue = (value?: string | string[]) => {
  if (typeof value !== "string") return;
  return decodeURIComponent(value);
};
