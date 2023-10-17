import { GastronomySuggestion, BarSuggestion, PartySuggestion, AttractionsSuggestion } from "../CardsSuggestion";
import type { TripScriptAction } from "@/core/types";
import { TripScriptActionSection } from "../TripScriptAction/trip-script-action.component";
import { ReactNode } from "react";

export interface TripScriptActionOrSuggestionProps {
  action: TripScriptAction; 
  ignoreNotSelected?: Boolean;
  children?: ReactNode;
  onClick?: () => void;
};

export const TripScriptActionOrSuggestion = ({ action, ignoreNotSelected = false, children, onClick }: TripScriptActionOrSuggestionProps) => {
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