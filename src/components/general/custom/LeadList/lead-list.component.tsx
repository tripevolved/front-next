import type { LeadListProps } from "./lead-list.types";

import { LeadListForm, SectionBase, Text } from "@/components";
import { css } from "@emotion/css";
import classNames from "classnames";
import { Container } from "mars-ds";

export const LeadList = ({ className, children, heading, text, form, ...props }: LeadListProps) => {
  const cn = classNames("lead-list", className, css({ padding: 0}));

  return (
    <SectionBase className={cn} container="none" {...props}>
      <div className="lead-list__heading p-section" style={{ paddingBottom: 0 }}>
        <Text className="text-center pb-2x" variant="heading" size="lg">{heading}</Text>
        <Text className="text-center color-text-secondary" size="lg">{text}</Text>
      </div>
      <div className="lead-list__content p-section">
        <Container className="lead-list__card">
          <LeadListForm {...form} />
        </Container>
      </div>
    </SectionBase>
  );
};

