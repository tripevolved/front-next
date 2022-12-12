import React from "react";
import { TravelerState, initialState } from "./state";
import { TravelersActions } from "./actions";

export const TravalersContext = React.createContext<{
  state: TravelerState;
	dispatch: React.Dispatch<TravelersActions>;
}>({
	state: initialState,
	dispatch: () => undefined,
});
