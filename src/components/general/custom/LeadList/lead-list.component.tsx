import { makeClassName } from "@/helpers/classname.helpers";
import type { LeadListProps } from "./lead-list.types";

import { LeadListForm, Text } from "@/components";
import { css } from "@emotion/css";
import { Container, Link } from "mars-ds";

export function LeadList({
  className,
  children,
  heading,
  text,
  link,
  sx,
  ...props
}: LeadListProps) {
  const cn = makeClassName("lead-list", className, css({ padding: 0 }))(sx);
  return (
    <section className={cn} {...props}>
      <Container className="lead-list__content p-section" container="sm">
        <Text className="text-center mb-2x" variant="heading" size="lg">
          {heading}
        </Text>
        <Text className="text-center color-text-secondary mb-2x" size="lg">
          {text}
        </Text>
        {link ? (
          <div className="text-center mb-2x">
            <Link {...link} />
          </div>
        ) : null}
        {children}
      </Container>
      <div className="lead-list__form mt-2x">
        <Container className="lead-list__card">
          <LeadListForm />
        </Container>
      </div>
    </section>
  );
}
