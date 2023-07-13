import { PageApp } from "@/features";
import { GlobalLoader } from "@/ui";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AppRoute() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/app/entrar");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageApp seo={{ title: "Início" }}>
      <GlobalLoader />
    </PageApp>
  );
}
