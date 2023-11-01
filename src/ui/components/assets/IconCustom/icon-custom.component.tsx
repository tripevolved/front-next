import type { IconCustomProps, IconCustomSize } from "./icon-custom.types";
import { icons } from "./icons/all";

const sizes: Record<IconCustomSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const IconCustom = ({ name, size: sizeName = "md", color }: IconCustomProps) => {
  const Icon = icons[name];
  const size = sizes[sizeName];
  return (
    <span className="icon-custom" title={name} style={{ color }}>
      <Icon size={size} />
    </span>
  );
};
