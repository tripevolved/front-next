import type { TripDiscoverStepContentProps } from "./trip-discover-step-content.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function TripDiscoverStepContent({ className, children, sx, onNext, onPrevious, ...props }: TripDiscoverStepContentProps) {
  const cn = makeCn("trip-discover-step-content", className)(sx);

  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};
