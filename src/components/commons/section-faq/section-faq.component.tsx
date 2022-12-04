import {
  AccordionItemProps,
  AccordionList,
} from "@/components/commons/accordion-list";
import { Heading, HeadingProps } from "@/ui/heading";
import { Section, SectionProps } from "@/ui/section";

export interface SectionFaqProps extends SectionProps {
  heading: HeadingProps;
  questions: AccordionItemProps[];
}

export const SectionFaq = ({
  heading,
  questions = [],
  ...props
}: SectionFaqProps) => {
  return (
    <Section maxWidth={"container.md"} {...props}>
      <Heading size="lg" textAlign="center" mb={10} {...heading} />
      <AccordionList items={questions} />
    </Section>
  );
};
