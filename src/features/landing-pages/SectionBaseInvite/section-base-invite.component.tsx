import { makeCn } from "@/utils/helpers/css.helpers";
import { SectionBase, SectionBaseProps } from "@/ui";
import { useMemo } from "react";
import { useRouter } from "next/router";

export function SectionBaseInvite({ className, tag, ...props }: SectionBaseProps) {
  const { query } = useRouter();
  const { inviter: inviterName = "", email: inviterEmail } = query;

  const cn = makeCn("section-base-invite", className)();

  const textTag = useMemo(() => {
    if (!(inviterName || inviterEmail) || typeof tag !== "string") return tag;
    return `${inviterName || inviterEmail} ${tag}`;
  }, [inviterEmail, inviterName, tag]);

  return <SectionBase className={cn} tag={textTag} {...props} />;
}
