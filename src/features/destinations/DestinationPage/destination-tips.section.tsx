import type { PublicDestinationTip } from "@/core/types";
import type { DestinationProps } from "./destination-page.types";

import { Icon } from "mars-ds";

import { SectionBase, Text } from "@/ui";
import { makeCn } from "@/utils/helpers/css.helpers";

interface DestinationTipsSectionProps extends Pick<DestinationProps, "tips"> {}

export const DestinationTipsSection = ({ tips = [] }: DestinationTipsSectionProps) => {
  return (
    <SectionBase className="destination-tips-section">
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

  const cn = makeCn("tip", { "tip--lg": description?.length > 120 })()

  return (
    <div className={cn}>
      <Icon size="lg" className="color-primary mb-lg" name={icon} />
      <Text>
        <strong>{title}</strong>:
      </Text>
      {subtitle ? <Text style={{ margin: 0 }}>{subtitle}</Text> : null}
      {description ? <Text size="sm">{description}</Text> : null}
    </div>
  );
};
