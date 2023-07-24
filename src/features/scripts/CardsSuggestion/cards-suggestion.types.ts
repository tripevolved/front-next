import type { ComponentHTMLProps } from "@/core/types";

export interface CardsSuggestionProps extends ComponentHTMLProps {
  icon: "gastronomy" | "attraction" | "bar" | "party";
  text: string;
  onClick: () => void;
}
