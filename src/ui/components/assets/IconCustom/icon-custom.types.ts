import type { IconCustomName } from "@/ui/icons";

export type IconCustomSize = "sm" | "md" | "lg";

export interface IconCustomProps {
  name: IconCustomName;
  size?: IconCustomSize;
  color?: string;
}

export { IconCustomName };
