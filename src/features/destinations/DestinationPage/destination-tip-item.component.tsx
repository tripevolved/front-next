import type { PublicDestinationTip } from "@/core/types";
import { Text } from "@/ui";
import { makeCn } from "@/utils/helpers/css.helpers";
import { Icon } from "mars-ds";

const TIP_ICON_MAP: Record<string, string> = {
  "climate": "cloud",
  "days-to-visit": "clock",
  "daily-cost": "dollar-sign",
  "generic": "info",
  "period": "calendar",
  "security": "shield",
};

export const DestinationTipItem = ({
  title,
  subtitle,
  description,
  type = "generic",
}: PublicDestinationTip) => {
  const icon = TIP_ICON_MAP[type] || TIP_ICON_MAP["generic"];

  const cn = makeCn("destination-tip-item", {
    "destination-tip-item--lg": description?.length > 120,
  })();

  return (
    <div className={cn}>
      <div>
        <Icon size="md" className="color-primary mb-lg" name={icon} />
      </div>
      <div className="destination-tip-item__content-box">
        <Text>
          <strong>{subtitle ? `${title}: ` : title}</strong>
          {subtitle}
        </Text>
        {description ? <Text style={{ marginTop: 4 }} size="sm">{description}</Text> : null}
      </div>
    </div>
  );
};
