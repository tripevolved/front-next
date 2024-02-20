import { SectionBase } from "@/ui";
import type { DestinationProps } from "./destination-page.types";
import { DestinationInfos, DestinationRecommendedBy } from "@/features";

interface DestinationInfoSectionProps extends Pick<DestinationProps, "features" | "recommendedBy"> {
  children?: any;
}

export const DestinationInfoSection = ({
  features = [],
  recommendedBy,
  children,
}: DestinationInfoSectionProps) => {
  return (
    <SectionBase columns={{ md: [1, "320px"] }} gap={32}>
      {features.length ? <DestinationInfos features={features} children={children} /> : null}
      {recommendedBy ? <DestinationRecommendedBy {...recommendedBy} /> : null}
    </SectionBase>
  );
};
