import { PageApp, PageAppBody, PageAppHeader, PendingSwitcher } from "@/features";
import { useRouter } from "next/router";

const TITLE = "Pendências da Viagem";

export default function TripPendingSwitcherRoute() {
  const router = useRouter();
  const idParam = String(router.query.id);
  const pendingType = String(router.query.pendingType);

  const subtitle = pendingType === "viajantes" ? "Dados dos viajantes" : "";

  return (
    <PageApp seo={{ title: TITLE }}>
      <PageAppHeader
        title={TITLE}
        subtitle={subtitle}
        backButton
        href={`/app/viagens/${idParam}/pendencias`}
      />
      <PageAppBody>
        <PendingSwitcher />
      </PageAppBody>
    </PageApp>
  );
}
