import type { TripDayAttractionsProps } from "./trip-day-attractions.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function TripDayAttractions({ className, children, sx, ...props }: TripDayAttractionsProps) {
  const cn = makeCn("trip-day-attractions", className)(sx);

  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};
