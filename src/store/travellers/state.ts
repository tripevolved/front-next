export enum Gender {
	MALE = 'Male',
	FEMALE = 'Female',
	OTHER = 'Other',
}

export interface Traveller {
	name: string;
	gender: Gender;
	birthDate?: Date | null;
	aloneOrFamilyTraveling?: Boolean;
}

export interface TravellerState {
	travellers: Traveller[];
}

export const initialState: TravellerState = {
  travellers: [{
		name: '',
		gender: Gender.MALE,
		aloneOrFamilyTraveling: false,
	}],
}
