import { GastronomySuggestion, BarSuggestion, PartySuggestion, AttractionsSuggestion } from "../CardsSuggestion";
import type { TripScriptAction } from "@/core/types";
import { TripScriptActionSection } from "../TripScriptAction/trip-script-action.component";
import { ReactNode } from "react";

export const TripScriptActionOrSuggestion = (action: TripScriptAction, ignoreNotSelected: Boolean = false, children?: ReactNode, onClick?: () => void) => {
  if (!action.isSelected) {
    return (ignoreNotSelected === true ? <></> :
      <>
        {action.type === "RESTAURANT" && <GastronomySuggestion />}
        {action.type === "BAR" && <BarSuggestion />}
        {action.type === "PARTY" && <PartySuggestion />}
        {action.type === "EVENT" && <AttractionsSuggestion />}
      </>
    );
  }
  return <TripScriptActionSection action={action} onClick={onClick}>{children}</TripScriptActionSection>;
};