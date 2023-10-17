import type { ComponentHTMLProps, TripScriptAction } from "@/core/types";

export interface AddAttractionsSectionProps extends ComponentHTMLProps {
  tripId: string;
  onClickAttraction: (atraction: TripScriptAction) => void;
}
