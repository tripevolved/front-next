import { GastronomySuggestion, BarSuggestion, PartySuggestion, AttractionsSuggestion } from "../CardsSuggestion";
import type { TripScriptAction } from "@/core/types";
import { TripScriptActionSection } from "./trip-script-action.section";

export const TripScriptActionOrSuggestion = (action: TripScriptAction) => {
  if (!action.isSelected) {
    return (
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