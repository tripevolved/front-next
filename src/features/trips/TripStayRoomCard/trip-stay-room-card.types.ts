import type { TripStayFeature, TripStayRoom } from "@/core/types";

export interface TripStayRoomCardProps extends TripStayRoom {
  features?: TripStayFeature[];
  onClick: () => void;
}
