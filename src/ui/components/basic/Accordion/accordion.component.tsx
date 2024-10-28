import { Picture, Text } from "@/ui";
import { css, cx } from "@emotion/css";
import { Accordion as MarsAccordion, Icon } from "mars-ds";
import { AccordionProps, FaqAccordionProps, HeaderAccordionProps } from "./accordion.types";

export function Accordion({ title, className, heading, children, ...props }: AccordionProps) {
  return (
    <MarsAccordion
      headerComponent={() => <HeaderAccordion heading={title} className={className} {...heading} />}
      className={className}
      {...props}>
      {children}
    </MarsAccordion>
  );
}

const HeaderAccordion = ({
  heading,
  className,
  image,
  sx,
  children,
  ...props
}: HeaderAccordionProps) => {
  const cn = cx("accordion__header-container py-xl", className, css(sx));
  return (
    <div className={cn} {...props}>
      {image ? <Picture>{image}</Picture> : null}
      <Text as="h3" size="xxl" className="text-bold flex-fill">
        {heading || children}
      </Text>
      <Icon className="accordion__header-container__icon-toggle--is-open" name="chevron-up" />
      <Icon className="accordion__header-container__icon-toggle--is-close" name="chevron-down" />
    </div>
  );
};

export function FaqAccordion({ question, answer, heading, children, ...props }: FaqAccordionProps) {
  return (
    <MarsAccordion
      headerComponent={() => <HeaderFaqAccordion heading={question} {...heading} />}
      {...props}
    >
      <div className="color-text-secondary pb-xl">
        {answer ? <Text size="lg">{answer}</Text> : null}
        {children}
      </div>
    </MarsAccordion>
  );
}

const HeaderFaqAccordion = ({
  heading,
  className,
  image,
  sx,
  children,
  ...props
}: HeaderAccordionProps) => {
  const cn = cx("accordion__header-container color-primary py-xl", className, css(sx));
  return (
    <div className={cn} {...props}>
      {image ? <Picture>{image}</Picture> : null}
      <Text as="h3" size="xxl" className="text-bold flex-fill">
        {heading || children}
      </Text>
      <Icon className="accordion__header-container__icon-toggle--is-open" name="minus-circle" />
      <Icon className="accordion__header-container__icon-toggle--is-close" name="plus-circle" />
    </div>
  );
};
