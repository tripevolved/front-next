import type { TripStayDetailsModalProps } from "./trip-stay-details-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function TripStayDetailsModal({ className, children, sx, ...props }: TripStayDetailsModalProps) {
  const cn = makeCn("trip-stay-details-modal", className)(sx);

  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};
