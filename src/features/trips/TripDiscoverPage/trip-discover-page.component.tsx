import { PageTrip, TemplateStepsBuilder } from "@/features";
import { GROUP_STEPS } from "./trip-discover-page.steps";

export const TripDiscoverPage = () => {
  return (
    <PageTrip seo={{ title: "Descubra sua trip" }}>
      <TemplateStepsBuilder steps={GROUP_STEPS} />
    </PageTrip>
  );
};
