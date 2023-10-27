import type { TripStayRoom } from "@/core/types";

export interface TripStayRoomCardProps extends TripStayRoom {
  onClick: () => void;
}
