import { Traveller, TravellerState, initialState } from "./state";
import { ActionType, AddTravellers, TravellersActions } from "./actions"

export function travellerReducer(
  state: TravellerState,
	action: TravellersActions
	): TravellerState {
		switch(action.type) {
			case ActionType.AddTraveller:
				return { ...state, travellers: [action.payload, ...state.travellers] };
			default:
				return state;
		}
}