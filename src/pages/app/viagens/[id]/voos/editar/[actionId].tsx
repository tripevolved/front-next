import { PageApp } from "@/features";
import { ChangeFlight } from "@/features/flights";
import { useIdParam } from "@/utils/hooks/param.hook";
import { useRouter } from "next/router";

const title = "Mudar voo";

export default function TripPendingRoute() {
  const router = useRouter();
  const idParam = useIdParam();
  const actionId = typeof router.query.actionId === "string" ? router.query.actionId : "";
  return (
    <PageApp
      headerOptions={{ title, backUrl: `/app/viagens/voos/editar/${idParam}` }}
      seo={{ title }}
    >
      <ChangeFlight />
    </PageApp>
  );
}
