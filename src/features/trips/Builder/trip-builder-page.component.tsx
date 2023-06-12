import { EmptyState, GlobalLoader } from "@/ui";
import { useTripBuilder } from "./trip-builder.hook"
import { TripBuilder } from "./trip-builder.component";

export const TripBuilderPage = () => {
  const { isLoading, data, error } = useTripBuilder();

  if (error) return <EmptyState  />
  if (isLoading) return <GlobalLoader />
  return <TripBuilder {...data} />
}
