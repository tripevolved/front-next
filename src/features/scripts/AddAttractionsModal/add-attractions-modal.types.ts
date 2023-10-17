import type { ComponentHTMLProps, TripScriptAction } from "@/core/types";

export interface AddAttractionsModalProps extends ComponentHTMLProps {
  tripId: string;
  onClickAttraction: (atraction: TripScriptAction) => void;
}
