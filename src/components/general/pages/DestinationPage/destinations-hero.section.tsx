import { DestinationProps, Text } from "@/components";

interface DestinationHeroSectionProps extends Pick<DestinationProps, "title" | "photos"> {}

export const DestinationHeroSection = ({ title, photos }: DestinationHeroSectionProps) => {
  return (
    <section className="destination-hero-section">
      <Text>{title}</Text>
    </section>
  );
};
