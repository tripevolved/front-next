import { PublicDestinationTip } from "@/types";
import type { DestinationProps } from "./destination-page.types";
import { SectionBase, Text } from "@/components";
import { Icon } from "mars-ds";

interface DestinationTipsSectionProps extends Pick<DestinationProps, "tips"> {}

export const DestinationTipsSection = ({ tips = [] }: DestinationTipsSectionProps) => {
  return (
    <SectionBase className="destination-tips-section" columns={{ xs: 2, sm: 4 }}>
      {tips.map((props, key) => (
        <Tip key={key} {...props} />
      ))}
    </SectionBase>
  );
};

const Tip = ({ title, subtitle, description, type }: PublicDestinationTip) => {
  const icon = type // TODO: parse info
  return (
    <div className="tip">
      <Icon size="lg" className="color-primary mb-lg" name={icon} />
      <Text>
        <strong>{title}</strong>:
      </Text>
      <Text style={{ margin: 0 }}>{subtitle}</Text>
      {description ? <Text>{description}</Text> : null}
    </div>
  );
};
