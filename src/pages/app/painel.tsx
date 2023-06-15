import { HeaderUserMenu, PageApp } from "@/features";

export default function DashboardRoute() {
  return (
    <PageApp seo={{ title: "Painel" }}>
      <HeaderUserMenu userName="Mariana" />
      <div>Painel</div>
    </PageApp>
  );
}
