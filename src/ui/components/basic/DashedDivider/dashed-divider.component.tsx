import type { DashedDividerProps } from "./dashed-divider.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function DashedDivider({ className, children, sx, ...props }: DashedDividerProps) {
  const cn = makeCn("dashed-divider", className)(sx);

  return (
    <div className={cn} {...props}>
      <div></div>
    </div>
  );
}
