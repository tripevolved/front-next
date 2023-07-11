import { ComponentHTMLProps } from "@/core/types";

export interface TripBuilderQuestionsProps extends ComponentHTMLProps {
  destinationId?: string;
}

export interface TripBuilderStartProps extends ComponentHTMLProps {
  destinationName: string;
}
