import type { TripStayRoomsListProps } from "./trip-stay-rooms-list.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function TripStayRoomsList({ className, children, sx, ...props }: TripStayRoomsListProps) {
  const cn = makeCn("trip-stay-rooms-list", className)(sx);

  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};
