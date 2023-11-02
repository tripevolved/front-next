import { PageApp, TripAccommodation } from "@/features";
import { useIdParam } from "@/utils/hooks/param.hook";

const title = "Hospedagem";

export default function TripPendingRoute() {
  const idParam = useIdParam();
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/criar/${idParam}` }} seo={{ title }}>
      <TripAccommodation />
    </PageApp>
  );
}
