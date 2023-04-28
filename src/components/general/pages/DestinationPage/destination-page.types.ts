import type { PublicDestination, TemplateProps } from "@/types";

export type DestinationProps = PublicDestination;

export interface DestinationPageProps extends TemplateProps {
  destination: DestinationProps;
};
