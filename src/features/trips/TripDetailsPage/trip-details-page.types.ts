import type { TripDetails, TemplateProps } from "@/core/types";

export type TripDetailsProps = TripDetails;

export interface TripDetailsPageProps extends TemplateProps {
  tripDetails: TripDetailsProps;
}
