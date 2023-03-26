import { makeClassName } from "@/helpers/classname.helpers";
import { SectionBase, SectionBaseProps } from "@/components";
import { useMemo } from "react";
import { useRouter } from "next/router";

export function SectionBaseInvite({ className, tag, ...props }: SectionBaseProps) {
  const { query } = useRouter();
  const { inviter = "Trip Evolved" } = query;

  const cn = makeClassName("section-base-invite", className)();

  const textTag = useMemo(() => {
    const name = String(inviter);
    return typeof tag === "string" ? `${name} ${tag}` : name;
  }, [inviter, tag]);

  return <SectionBase className={cn} tag={textTag} {...props} />;
}
