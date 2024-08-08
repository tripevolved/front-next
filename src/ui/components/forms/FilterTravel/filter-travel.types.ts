export interface FilterTravelProps {
  options: {
    travelerProfiles: { value: string, label: string }[],
    objectiveIds: { value: string, label: string }[],
    days: { value: string, label: string }[],
    budgets: { value: string, label: string }[]
  };
  buttonText: string;
  onFetchResults: (formData: {
    travelerProfile: string;
    objectiveId: string;
    days: string;
    budget: string;
  }) => void;
}
