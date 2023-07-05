import type { ComponentHTMLProps, TripDashboard } from "@/core/types";

export interface TripDashboardProps extends ComponentHTMLProps {
  tripDashboard: TripDashboard;
  name: string;
}

export interface TripDashboardItemProps extends ComponentHTMLProps {
  icon: string;
  color: string;
  qtd: number;
  href: string;
  description: string;
}
