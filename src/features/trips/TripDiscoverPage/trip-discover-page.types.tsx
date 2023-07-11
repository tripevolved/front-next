import { ComponentHTMLProps } from "@/core/types";

export interface TripDiscoverStepProps extends ComponentHTMLProps {
  onSubmit: () => void;
}

export interface TripDiscoverStartProps extends TripDiscoverStepProps {
  title?: string;
  subtitle?: string;
}

export interface TravelerProfileBuilderSectionProps extends TripDiscoverStepProps {
  travelerId: string;
}

export interface TravelerProfileSectionProps extends TripDiscoverStepProps {
  travelerProfile: string;
}

export interface TripDiscoverQuestionProps extends TripDiscoverStepProps {
  travelerId: string;
}

export interface TripGoalQuestionProps extends TripDiscoverStepProps {
  travelerId: string;
  destinationId?: string;
}