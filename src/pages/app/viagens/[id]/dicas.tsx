import { PageApp, TripTips } from "@/features";
import { useIdParam } from "@/utils/hooks/param.hook";

const title = "Dicas";

export default function TipsTravelRoute() {
  const idParam = useIdParam();
  return (
    <PageApp headerOptions={{ title, backUrl: `/app/viagens/${idParam}` }} seo={{ title }}>
      <TripTips />
    </PageApp>
  );
}
