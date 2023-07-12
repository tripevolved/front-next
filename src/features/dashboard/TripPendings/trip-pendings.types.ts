import type { ComponentHTMLProps, TripPendingAction } from "@/core/types";

export type TripPendingItemProps = TripPendingAction & { tripid: string | null };

export interface TripPendingsProps extends ComponentHTMLProps {}
