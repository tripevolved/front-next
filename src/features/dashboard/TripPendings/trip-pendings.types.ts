import type { ComponentHTMLProps, TripPendingAction } from "@/core/types";

export type TripPendingItemProps = TripPendingAction & { tripId: string | null };

export interface TripPendingsProps extends ComponentHTMLProps {}
