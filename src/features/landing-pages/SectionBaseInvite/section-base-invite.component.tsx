import { makeCn } from "@/utils/helpers/css.helpers";
import { SectionBase, SectionBaseProps } from "@/ui";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { LeadApiService } from "@/services/api/lead";

export function SectionBaseInvite({ className, tag, ...props }: SectionBaseProps) {
  const { query } = useRouter();
  const { inviter = "", email } = query;

  const cn = makeCn("section-base-invite", className)();

  const textTag = useMemo(() => {
    if (!(inviter || email) || typeof tag !== "string") return tag;
    return `${inviter || email} ${tag}`;
  }, [email, inviter, tag]);

  useEffect(() => {
    if (!email) return;
    const lead = LeadApiService.getLocal();
    if (lead?.email === email) return;
    LeadApiService.getByEmail(String(email));
  }, [email]);

  return <SectionBase className={cn} tag={textTag} {...props} />;
}
