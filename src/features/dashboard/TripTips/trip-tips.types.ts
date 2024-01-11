import type { ComponentHTMLProps, TripTip } from "@/core/types";

export type TripTipItemProps = TripTip & { tripId: string | null };

export interface TripTipsProps extends ComponentHTMLProps {}
