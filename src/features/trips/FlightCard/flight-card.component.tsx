import { Card } from "mars-ds";

import { Picture } from "@/ui";

import type { FlightCardProps } from "./flight-card.types";
import { FlightBox } from "@/features";

export function FlightCard({ flight }: FlightCardProps) {
  return (
    <Card className="flight-card w-100 flex-column" elevation="md">
      <div className="flight-card__airline">
        <Picture className="flight-card__airline__airline-logo-company" height={60}>
          {flight.airlineCompanyLogoUrl ? flight.airlineCompanyLogoUrl : "/assets/blank-image.png"}
        </Picture>
        <FlightBox />
      </div>
    </Card>
  );
}

export function
