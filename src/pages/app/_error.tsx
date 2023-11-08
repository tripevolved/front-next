import { PageApp } from "@/features";
import { EmptyState } from "@/ui";

export default function AppErrorRoute() {
  return (
    <PageApp
      headerOptions={{ backUrl: "/app/painel", title: "Voltar" }}
      seo={{ title: "Página não encontrada" }}
    >
      <EmptyState />
    </PageApp>
  );
}
