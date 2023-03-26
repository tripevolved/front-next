import type { ComponentHTMLProps } from "@/types";
import type { TextProps } from "@/components";

export interface AwardCardProps extends ComponentHTMLProps {
  emojiName?: string;
  label?: string;
  heading?: TextProps
  text?: TextProps
};
