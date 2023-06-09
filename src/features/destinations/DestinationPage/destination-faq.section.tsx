import { Button, Container } from "mars-ds";
import type { DestinationProps } from "./destination-page.types";
import { Accordion, SectionBase, Text, WhatsappButton } from "@/ui";
import { useMemo } from "react";

interface DestinationFaqSectionProps extends Pick<DestinationProps, "faq" | "title"> {}

export const DestinationFaqSection = ({ faq = [], title }: DestinationFaqSectionProps) => {
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
          <Accordion key={key} heading={{ image }} answer={answer} question={question} />
        ))}
      </Container>
      <div>
        <Button
          className="mt-2x"
          style={{ width: 336 }}
          variant={"custom"}
          href={"/viagens/builder"}
          backgroundColor={"var(--color-brand-2)"}
          hoverBackgroundColor={"var(--color-secondary-900)"}
          color={"white"}
        >
          Quero ir
        </Button>
      </div>
    </SectionBase>
  );
};
