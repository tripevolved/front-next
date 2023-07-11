import { ComponentHTMLProps } from "@/core/types";
import { CreateTripDto } from "@/services/api/trip/create";

export interface CreateTripFormProps extends ComponentHTMLProps {
  destinationId?: string;
  redirectTo: string;
  onFinish: (trip: CreateTripDto) => void;
}

export interface CreateTripProps extends ComponentHTMLProps {
  destinationId?: string;
  redirectTo: string;
}
