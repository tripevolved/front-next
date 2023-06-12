import { ComponentHTMLProps } from "@/core/types";
import type { PageAppProps } from "@/features/templates/PageApp"

export interface TripBuilderQuestionsProps extends ComponentHTMLProps {
  destinationId?: string;
}

export interface TripBuilderPageProps extends PageAppProps {
  destinationId?: string;
}
