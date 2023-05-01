import { DestinationProps, SectionBase, Text } from "@/components";
import { Container } from "mars-ds";

interface DestinationHeroSectionProps extends Pick<DestinationProps, "title" | "photos"> { }

export const DestinationHeroSection = ({ title, photos }: DestinationHeroSectionProps) => {
  return (
    <SectionBase sx={{ paddingTop: 0, paddingBottom: 0 }} className="destination-hero-section">
      <div className="destination-hero-section__photos">

      </div>
      <div className="destination-hero-section__content">
        <Text heading as="h1">{title}</Text>
      </div>
    </SectionBase>
  );
};
