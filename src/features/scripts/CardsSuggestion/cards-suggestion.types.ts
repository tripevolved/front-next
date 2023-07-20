import type { ComponentHTMLProps } from "@/core/types";

export interface CardsSuggestionProps extends ComponentHTMLProps {
  icon: "gastronomy" | "attraction";
  text: string;
  onClick: () => void;
}
