import { Picture, Text } from "@/components";
import { css, cx } from "@emotion/css";
import { Accordion as MarsAccordion, Icon } from "mars-ds";
import { AccordionProps, HeaderAccordionProps } from "./accordion.types";

export function Accordion({ question, answer, heading, children, ...props }: AccordionProps) {
  return (
    <MarsAccordion
      headerComponent={() => <HeaderAccordion heading={question} {...heading} />}
      {...props}
    >
      <div className="color-text-secondary pb-xl">
        {answer ? <Text size="lg">{answer}</Text> : null}
        {children}
      </div>
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
