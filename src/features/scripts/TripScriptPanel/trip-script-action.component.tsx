import { GastronomySuggestion, BarSuggestion, PartySuggestion, AttractionsSuggestion } from "../CardsSuggestion";
import type { TripScriptAction } from "@/core/types";
import { TripScriptActionSection } from "./trip-script-action.section";

export const TripScriptActionOrSuggestion = (action: TripScriptAction, ignoreNotSelected: Boolean = false) => {
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
  return <TripScriptActionSection action={action} />;
};