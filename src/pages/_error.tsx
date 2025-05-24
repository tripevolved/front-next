import { PageApp } from "@/features";
import { EmptyState } from "@/ui";

export default function ErrorPage() {
  return (
    <PageApp
      headerOptions={{ backUrl: "/", title: "Voltar" }}
      seo={{ title: "Página não encontrada" }}
    >
      <EmptyState />
    </PageApp>
  );
}
