import { PageApp } from "@/features";
import { EmptyState } from "@/ui";
import { useRouter } from "next/router";

const title = "Documentos";

export default function DocumentsTravelRoute() {
  const router = useRouter();
  const idParam = router.query.id;
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/${idParam}` }} seo={{ title }}>
      <EmptyState />
    </PageApp>
  );
}
