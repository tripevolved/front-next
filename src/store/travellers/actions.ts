import { Traveler } from "./state";

export enum ActionType {
	AddTraveler,
	ClearTravelers,
}

export interface AddTravelers {
	type: ActionType.AddTraveler;
	payload: Traveler;
}

export interface ClearTravelers {
	type: ActionType.ClearTravelers;
}

export type TravelersActions = AddTravelers | ClearTravelers;