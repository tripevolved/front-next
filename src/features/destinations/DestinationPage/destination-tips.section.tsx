import type { PublicDestinationTip } from "@/core/types";
import type { DestinationProps } from "./destination-page.types";

import { Icon } from "mars-ds";

import { SectionBase, Text, Box } from "@/ui";
import { makeCn } from "@/utils/helpers/css.helpers";

interface DestinationTipsSectionProps extends Pick<DestinationProps, "tips"> {}

export const DestinationTipsSection = ({ tips = [] }: DestinationTipsSectionProps) => {
  return (
    <SectionBase className="destination-tips-section">
      <Text heading size="sm" className="destination-tips-section__title mb-2x pb-1x">
        Dicas do destino
      </Text>
      <div className="destination-tips-section__container">
        {tips.map((props, key) => (
          <Tip key={key} {...props} />
        ))}
      </div>
    </SectionBase>
  );
};

const TIP_ICON_MAP: Record<string, string> = {
  "climate": "cloud",
  "days-to-visit": "clock",
  "daily-cost": "dollar-sign",
  "generic": "info",
  "period": "calendar",
  "security": "shield",
};

const Tip = ({ title, subtitle, description, type = "generic" }: PublicDestinationTip) => {
  const icon = TIP_ICON_MAP[type] || TIP_ICON_MAP["generic"];

  const cn = makeCn("tip", { "tip--lg": description?.length > 120 })();

  return (
    <div className={cn}>
      <Box>
        <Icon size="md" className="color-primary mb-lg" name={icon} />
      </Box>
      <Box className="tip__content-box">
        <Text>
          <strong>{title}</strong>: {subtitle ? subtitle : "---"}
        </Text>
        {description ? <Text size="sm">{description}</Text> : null}
      </Box>
    </div>
  );
};
