import { makeClassName } from "@/helpers/classname.helpers";
import { SectionBase, SectionBaseProps } from "@/components";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { LeadApiService } from "@/services/api/lead-api.service";

export function SectionBaseInvite({ className, tag, ...props }: SectionBaseProps) {
  const { query } = useRouter();
  const { inviter = "Trip Evolved", email } = query;

  const cn = makeClassName("section-base-invite", className)();

  const textTag = useMemo(() => {
    const name = String(inviter);
    return typeof tag === "string" ? `${name} ${tag}` : name;
  }, [inviter, tag]);

  useEffect(() => {
    if (!email) return;
    const lead = LeadApiService.getLocal();
    if (lead?.email === email) return;
    LeadApiService.getRefByEmail(String(email));
  }, [email]);

  return <SectionBase className={cn} tag={textTag} {...props} />;
}
