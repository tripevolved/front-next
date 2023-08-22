import { SectionBase } from "@/ui";
import type { DestinationProps } from "./destination-page.types";
import { DestinationInfos, DestinationRecommendedBy } from "@/features";

interface DestinationInfoSectionProps
  extends Pick<DestinationProps, "features" | "recommendedBy"> {}

export const DestinationInfoSection = ({
  features = [],
  recommendedBy,
}: DestinationInfoSectionProps) => {
  return (
    <SectionBase columns={{ md: [1, "320px"] }} gap={32}>
      {features.length ? <DestinationInfos features={features} /> : null}
      {recommendedBy ? <DestinationRecommendedBy {...recommendedBy} /> : null}
    </SectionBase>
  );
};
