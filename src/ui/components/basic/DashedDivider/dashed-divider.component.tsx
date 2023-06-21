import type { DashedDividerProps } from "./dashed-divider.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function DashedDivider({
  className,
  children,
  sx,
  color = "#d7dade",
  ...props
}: DashedDividerProps) {
  const cn = makeCn("dashed-divider", className)(sx);

  return (
    <div className={cn} {...props}>
      <div style={{ border: `1px dashed ${color}` }}></div>
    </div>
  );
}
