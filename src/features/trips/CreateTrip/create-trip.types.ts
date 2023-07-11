import { ComponentHTMLProps } from "@/core/types";
import { CreateTripDto } from "@/services/api/trip/create";

export interface CreateTripProps extends ComponentHTMLProps {
  destinationId?: string;
  redirectTo: string;
  onFinish: (trip: CreateTripDto) => void;
}