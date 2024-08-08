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
