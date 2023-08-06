import type { ComponentHTMLProps, TripScriptAttraction } from "@/core/types";

export interface AddAttractionCardProps extends ComponentHTMLProps {
  attraction: TripScriptAttraction;
  onAddClick: () => void;
  onViewClick: () => void;
}
