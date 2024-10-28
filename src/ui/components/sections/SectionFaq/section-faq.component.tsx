import type { SectionFaqProps } from "./section-faq.types";

import { FaqAccordion, Text } from "@/ui";
import classNames from "classnames";
import { SectionBase } from "mars-ds";

export function SectionFaq({
  className,
  children,
  heading,
  questions = [],
  ...props
}: SectionFaqProps) {
  const cn = classNames("section-faq", className);

  return (
    <SectionBase className={cn} container="md" {...props}>
      <Text variant="heading" as="h2" size="xl" className="text-center mb-3x">
        {heading}
      </Text>
      {children}
      <div className="section-faq__content">
        {questions.map((question, key) => (
          <FaqAccordion key={question.id || key} {...question} />
        ))}
      </div>
    </SectionBase>
  );
}
