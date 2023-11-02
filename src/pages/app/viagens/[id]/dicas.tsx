import { PageApp } from "@/features";
import { EmptyState } from "@/ui";
import { useIdParam } from "@/utils/hooks/param.hook";
import { useRouter } from "next/router";

const title = "Dicas";

export default function TipsTravelRoute() {
  const idParam = useIdParam();
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/${idParam}` }} seo={{ title }}>
      <EmptyState />
    </PageApp>
  );
}
