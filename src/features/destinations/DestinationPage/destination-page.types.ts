import type { PublicDestination, TemplateProps } from "@/core/types";

export type DestinationProps = PublicDestination;

export interface DestinationPageProps extends TemplateProps {
  destination: DestinationProps;
};
