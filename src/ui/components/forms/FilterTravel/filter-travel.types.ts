export interface FilterTravelProps {
  options: {
    travelerTypes: { value: string, label: string }[],
    travelPurposes: { value: string, label: string }[],
    durations: { value: string, label: string }[],
    budgets: { value: string, label: string }[]
  },
  buttonText: string,
}
