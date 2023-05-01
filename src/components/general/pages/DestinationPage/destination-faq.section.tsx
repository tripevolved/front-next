import { Button, Heading } from "mars-ds";
import type { DestinationProps } from "./destination-page.types";
import { Accordion, SectionBase } from "@/components";

interface DestinationFaqSectionProps extends Pick<DestinationProps, "faq" | "title"> {}

export const DestinationFaqSection = ({ faq, title }: DestinationFaqSectionProps) => {
  return (
    <SectionBase container={"md"}>
      <Heading
        level={6}
        size={"xxl"}
        html={`Quer viajar para ${title} com a Trip Evolved? Veja o que nossa viagem inclui`}
        className="mb-3x"
      />
      {faq &&
        faq?.map(({ answer, icon, question }, key) => (
          <Accordion key={key} heading={{ image: icon }} answer={answer} question={question} />
        ))}
      <div className="flex justify-content-center">
        <Button
          className="mt-2x"
          style={{ width: 336 }}
          variant={"custom"}
          href={"#"}
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
