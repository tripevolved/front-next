import type { ComponentHTMLProps } from "@/core/types";
import type { TextProps } from "@/ui";

export interface AwardCardProps extends ComponentHTMLProps {
  emojiName?: string;
  label?: string;
  heading?: TextProps;
  text?: TextProps;
}
