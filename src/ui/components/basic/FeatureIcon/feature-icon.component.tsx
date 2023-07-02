import type { FeatureIconProps } from "./feature-icon.types";
import { Picture } from "@/ui";

export function FeatureIcon({
  className,
  children,
  name,
  size,
  sx,
  style,
  ...props
}: FeatureIconProps) {

  const FEATURE_ICON_SIZE = size ?? 15;
  return (
    <Picture
      src={`/assets/trip/${name}.svg`}
      height={FEATURE_ICON_SIZE}
      width={FEATURE_ICON_SIZE}
    />
  );
}
