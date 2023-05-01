import { Box, SectionBase } from "@/components";
import { DestinationProps } from "./destination-page.types";

interface DestinationInfoSectionProps
  extends Pick<DestinationProps, "features" | "recommendedBy"> {}

export const DestinationInfoSection = ({}: DestinationInfoSectionProps) => {
  return (
    <SectionBase columns={{ md: [2, 1] }}>
      <DestinationInfoFeatures />
      <DestinationInfoRecommendedBy />
    </SectionBase>
  );
};

const DestinationInfoFeatures = () => {
  return <Box>DestinationInfoFeatures</Box>;
};

const DestinationInfoRecommendedBy = () => {
  return <Box>DestinationInfoRecommendedBy</Box>;
};
