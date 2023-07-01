import type { TripAccordeonProps } from "./trip-accordeon.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function TripAccordeon({ className, children, sx, ...props }: TripAccordeonProps) {
  const cn = makeCn("trip-accordeon", className)(sx);

  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};
