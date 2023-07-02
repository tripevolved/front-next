import type { ComponentHTMLProps } from "@/core/types";
import type { TravelerProfileType } from "@/core/types";

export interface HasProfileProps extends ComponentHTMLProps {
  profileType: TravelerProfileType;
}
