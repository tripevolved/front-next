import { PageApp } from "@/features";
import { EmptyState } from "@/ui";
import { useIdParam } from "@/utils/hooks/param.hook";

const title = "Documentos";

export default function DocumentsTravelRoute() {
  const idParam = useIdParam();
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/${idParam}` }} seo={{ title }}>
      <EmptyState />
    </PageApp>
  );
}
