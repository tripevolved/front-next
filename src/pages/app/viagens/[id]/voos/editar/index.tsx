import { PageApp } from "@/features";
import { ChangeFlight } from "@/features/flights";
import { useIdParam } from "@/utils/hooks/param.hook";
import { useRouter } from "next/router";

const title = "Mudar voo";

export default function ChangeFlightScreen() {
  const router = useRouter();
  const idParam = useIdParam();
  const tripId = typeof router.query.id === "string" ? router.query.id : "";

  return (
    <PageApp
      headerOptions={{ title, backUrl: `/app/viagens/${idParam}/detalhes/` }}
      seo={{ title }}
    >
      <ChangeFlight tripId={tripId} />
    </PageApp>
  );
}
