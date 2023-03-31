import type { LeadListProps } from "./lead-list.types";

import { LeadListForm, SectionBase, Text } from "@/components";
import { css } from "@emotion/css";
import classNames from "classnames";
import { Container, Link } from "mars-ds";

export function LeadList({
  className,
  children,
  heading,
  text,
  link,
  ...props
}: LeadListProps) {
  const cn = classNames("lead-list", className, css({ padding: 0 }));

  return (
    <SectionBase className={cn} container="none" {...props}>
      <div className="lead-list__heading p-section" style={{ paddingBottom: 0 }}>
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
      </div>
      <div className="lead-list__content mt-2x">
        <Container className="lead-list__card">
          <LeadListForm />
        </Container>
      </div>
    </SectionBase>
  );
}
