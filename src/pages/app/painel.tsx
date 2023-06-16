import { PageApp, Painel } from "@/features";

export default function DashboardRoute() {
  return (
    <PageApp seo={{ title: "Painel" }}>
      <Painel />
    </PageApp>
  );
}
