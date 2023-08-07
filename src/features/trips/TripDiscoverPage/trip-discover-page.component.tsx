import { PageTrip, TripDiscoverSteps } from "@/features";

export const TripDiscoverPage = () => {
  return (
    <PageTrip seo={{ title: "Descubra sua trip" }}>
      <TripDiscoverSteps />
    </PageTrip>
  );
};
