import { useMemo } from "react";
import type { StepsProgressBarProps } from "./steps-progress-bar.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function StepsProgressBar({ className, children, position = 0, total = 1, sx, ...props }: StepsProgressBarProps) {
  const cn = makeCn("steps-progress-bar", className)(sx);

  const width = useMemo(() => {
    const percentage = (position / total) * 100;
    return `${percentage}%`;
  }, [position, total]);

  return (
    <div className={cn} {...props}>
      <div className="steps-progress-bar__status" style={{ width }} />
    </div>
  );
};
