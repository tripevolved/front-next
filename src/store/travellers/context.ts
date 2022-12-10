import React from "react";
import { TravellerState, initialState } from "./state";
import { TravellersActions } from "./actions";

export const TravallerContext = React.createContext<{
  state: TravellerState;
	dispatch: React.Dispatch<TravellersActions>;
}>({
	state: initialState,
	dispatch: () => undefined,
});
