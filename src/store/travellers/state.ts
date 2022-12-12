export enum Gender {
	MALE = 'Male',
	FEMALE = 'Female',
	OTHER = 'Other',
}

export interface Traveler {
	name: string;
	gender: Gender;
	birthDate?: Date | null;
	aloneOrFamilyTraveling?: Boolean;
}

export interface TravelerState {
	travelers: Traveler[];
}

export const initialState: TravelerState = {
  travelers: [{
		name: '',
		gender: Gender.MALE,
		aloneOrFamilyTraveling: false,
	}],
}
