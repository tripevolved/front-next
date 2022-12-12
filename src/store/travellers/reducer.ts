import { TravelerState, initialState } from "./state";
import { ActionType, TravelersActions } from "./actions"

export function travelerReducer(
  state: TravelerState,
	action: TravelersActions
): TravelerState {
	switch(action.type) {
		case ActionType.AddTraveler:
			return { ...state, travelers: [action.payload, ...state.travelers] };
		
		case ActionType.ClearTravelers:
			return { ...state, ...initialState };

		default:
			return state;
	}
}