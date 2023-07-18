import { ComponentHTMLProps } from "@/core/types";

export interface EmojiProps extends ComponentHTMLProps {
  name?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  align?: "left" | "right";
}
