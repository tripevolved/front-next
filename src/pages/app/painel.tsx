import { DashboardHome, PageApp } from "@/features";

export default function DashboardRoute() {
  return (
    <PageApp seo={{ title: "Painel" }}>
      <DashboardHome />
    </PageApp>
  );
}
