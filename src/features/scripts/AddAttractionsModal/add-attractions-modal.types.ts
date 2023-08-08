import type { ComponentHTMLProps, UpdateScriptAction } from "@/core/types";

export interface AddAttractionsModalProps extends ComponentHTMLProps {
  tripId: string;
  onClickAttraction: (atraction: UpdateScriptAction) => void;
  onSaveClick: () => void;
}
