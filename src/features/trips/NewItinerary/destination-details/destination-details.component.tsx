import { useMemo } from "react";
import { useTripDetails } from "../../TripDetailsPage/trip-details.hook";
import { EmptyState, ErrorState, LoaderState } from "@/ui";
import { TravelTypeDestination } from "./travelType.destination.component";
import { HighlightsDestination } from "./highlights.destination.component";
import { TipsDestination } from "./tips.destination.component";

export const DestinationDetails = () => {
  const { isLoading, data, error } = useTripDetails();
  const destination = useMemo(() => {
    if (data !== undefined) {
      return data.destination;
    }
    return undefined;
  }, [data]);

  if (error) {
    return <ErrorState />;
  }
  if (isLoading) {
    return <LoaderState />;
  }
  if (!destination) return <EmptyState />;
  return (
    <div className="flex flex-column gap-lg mb-xl">
      <TravelTypeDestination travelerProfiles={destination.travelerProfiles} />
      <HighlightsDestination features={destination.features} />
      <TipsDestination tips={destination.tips} />
    </div>
  );
};
