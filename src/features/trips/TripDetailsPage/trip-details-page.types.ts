import type {
  TripDestination,
  TemplateProps,
  TripTransportation,
  TripConfiguration,
  TripDetails,
} from "@/core/types";

export type TripDetailsProps = TripDetails;

export interface TripDetailsPageProps extends TemplateProps {
  tripDetails: TripDetailsProps;
}
