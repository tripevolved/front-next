import { DestinationProps, Text } from "@/components";
import { Container } from "mars-ds";

interface DestinationHeroSectionProps extends Pick<DestinationProps, "title" | "photos"> {}

export const DestinationHeroSection = ({ title, photos }: DestinationHeroSectionProps) => {
  return (
    <section className="destination-hero-section">
      <div className="destination-hero-section__photos">
      </div>
      <Container className="destination-hero-section__content">
        <Text heading as="h1" size="lg">
          <strong>{title}</strong>
        </Text>
      </Container>
    </section>
  );
};
