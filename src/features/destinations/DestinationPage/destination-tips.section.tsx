import type { DestinationProps } from "./destination-page.types";

import { SectionBase, Text } from "@/ui";
import { DestinationTipItem } from "./destination-tip-item.component";

interface DestinationTipsSectionProps extends Pick<DestinationProps, "tips"> {
  children?: any;
}

export const DestinationTipsSection = ({ tips = [], children }: DestinationTipsSectionProps) => {
  return (
    <SectionBase className="destination-tips-section">
      <Text as="h2" heading size="sm" className="destination-tips-section__title mb-2x pb-1x">
        Dicas do destino
      </Text>
      <div className="destination-tips-section__container">
        {tips.map((props, key) => (
          <DestinationTipItem key={key} {...props} />
        ))}
      </div>
      {children}
    </SectionBase>
  );
};
