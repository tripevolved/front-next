import { useAppStore } from "@/core/store";
import { PageApp } from "@/features";
import { UserService } from "@/services/user";
import { SectionBase } from "@/ui";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LogOutRoute() {
  return (
    <PageApp hideHeader seo={{ title: "Sair" }}>
      <SectionLogOut />
    </PageApp>
  );
}

const SectionLogOut = () => {
  const { clearUser } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    clearUser();
    UserService.logout();
    router.replace("/app/entrar");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <SectionBase>Saindo...</SectionBase>;
};
