import { makeCn } from "@/utils/helpers/css.helpers";
import type { LeadListProps } from "./lead-list.types";

import { Text } from "@/ui";
import { css } from "@emotion/css";
import { Container, Link } from "mars-ds";
import { LeadListForm } from "../LeadListForm";

export function LeadList({
  className,
  children,
  heading,
  text,
  link,
  sx,
  ...props
}: LeadListProps) {
  const cn = makeCn("lead-list", className, css({ padding: 0 }))(sx);
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
