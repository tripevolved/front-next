import type { ComponentHTMLProps, TripDashboard } from "@/core/types";

export interface TripDashboardProps extends ComponentHTMLProps {
  tripDashboard: TripDashboard;
  tripId: string;
}

export interface TripDashboardCardProps extends ComponentHTMLProps {
  icon: string;
  color?: string;
  qtd: number;
  href: string;
  description: string;
  type?: "script" | "default";
}
