import { Traveller } from "./state";

export enum ActionType {
	AddTraveller,
}

export interface AddTravellers {
	type: ActionType.AddTraveller;
	payload: Traveller;
}

export type TravellersActions = AddTravellers;