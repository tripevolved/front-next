import { PageBase, PublicDestinations, NavbarProps, FooterProps } from "@/features";

const NAVBAR_CONFIG: NavbarProps = {
  menu: [
    {
      href: "/perfil",
      label: "Perfil do viajante",
    },
    { href: "/vale-viagem", label: "Vale-viagem" },
    { href: "/sobre", label: "Sobre nós" },
    { href: "/", label: "Blog" },
    { href: "/pre-cadastro", highlight: true, label: "Quero meu acesso" },
  ],
};

const FOOTER_CONFIG: FooterProps = {
  // TODO: build footer configurations
};

export default function OurDestinationsRoute() {
  return (
    <PageBase seo={{ title: "Nossos destinos" }} navbar={NAVBAR_CONFIG} footer={FOOTER_CONFIG}>
      <PublicDestinations />
    </PageBase>
  );
}
