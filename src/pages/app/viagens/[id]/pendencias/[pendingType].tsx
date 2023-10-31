import { PageApp, PendingSwitcher } from "@/features";
import { useRouter } from "next/router";

const title = "Pendências da Viagem";

export default function TripPendingSwitcherRoute() {
  const router = useRouter();
  const idParam = String(router.query.id);
  const pendingType = String(router.query.pendingType);

  const subtitle = pendingType === "viajantes" ? "Dados dos viajantes" : undefined;

  return (
    <PageApp
      headerOptions={{ title, subtitle, backUrl: `/app/viagens/${idParam}/pendencias` }}
      seo={{ title }}
    >
      <PendingSwitcher />
    </PageApp>
  );
}
