export interface SectionFilterTravelProps {
  id: string,
  title: string,
  optionsFilter: {
    travelerProfiles: { value: string, label: string }[],
    objectiveIds: { value: string, label: string }[],
    days: { value: string, label: string }[],
    budgets: { value: string, label: string }[]
  },
  buttonText: string,
}

export interface TravelChoice {
  destinationId: string;
  matchScore: number;
  percentualMatchScore: string;
  name: string;
  uniqueName: string;
  details: string;
  price: string;
  images: { url: string; type: string; width: number; height: number }[];
}

export interface ListTravelProps {
  mainChoice: TravelChoice;
  otherChoices: TravelChoice[];
}
