import { Container } from "mars-ds";
import type { DestinationProps } from "./destination-page.types";
import { FaqAccordion, SectionBase, Text } from "@/ui";

interface DestinationFaqSectionProps extends Pick<DestinationProps, "faq" | "title"> {
  children?: React.ReactNode;
}

export const DestinationFaqSection = ({ faq = [], title, children }: DestinationFaqSectionProps) => {
  return (
    <SectionBase className="destination-faq-section text-center">
      <Text heading as="h2" className="mb-sm">
        Quer viajar para <strong>{title}</strong> com a Trip Evolved?
      </Text>
      <Text heading as="h3" size="md">
        Veja o que nossa viagem inclui:
      </Text>
      <Container container="md" className="py-2x section-faq__content text-left">
        {faq.map(({ answer, icon: image, question }, key) => (
          <FaqAccordion key={key} heading={{ image }} answer={answer} question={question} />
        ))}
      </Container>
      {children}
    </SectionBase>
  );
};
