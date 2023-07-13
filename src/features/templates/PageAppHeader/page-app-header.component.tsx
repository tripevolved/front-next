import { SectionBase } from "@/ui";
import type { PageAppHeaderProps } from "./page-app-header.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function PageAppHeader({ className, children, sx, ...props }: PageAppHeaderProps) {
  const cn = makeCn("page-app-header", className)(sx);

  return (
    <SectionBase className={cn} container="md" {...props}>
      {children}
    </SectionBase>
  );
};
