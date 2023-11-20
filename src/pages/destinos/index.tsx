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
  slogan:
    "Tecnologia e curadoria especializada para uma experiência de viagem única e exclusiva em um sistema por assinatura de recomendações de destinos e roteiros de viagens.",
  menu: [
    {
      title: "Fale conosco",
      list: [
        {
          isExternal: true,
          href: "mailto:info@tripevolved.com.br",
          label: "info@tripevolved.com.br",
        },
      ],
    },
    {
      title: "Legal",
      list: [
        {
          label: "Termos de Uso",
          href: "/termos-de-uso",
        },
        {
          label: "Políticas de Privacidade",
          href: "/politica-de-privacidade",
        },
        {
          label: "Políticas de Cookies",
          href: "/politica-de-cookies",
        },
      ],
    },
    {
      title: "Lançamento",
      list: [
        {
          label: "Participe da lista de espera",
          href: "/#lista-de-espera",
        },
        {
          label: "Descubra o seu perfil de viajante",
          href: "/perfil",
        },
        {
          label: "Vale-Viagem",
          href: "/vale-viagem",
        },
        {
          label: "Parceiros",
          href: "/parceiros",
        },
      ],
    },
  ],
  social: [
    {
      icon: "instagram",
      href: "https://www.instagram.com/tripevolved/",
      alt: "Instagram",
    },
    {
      icon: "linkedin",
      href: "https://www.linkedin.com/company/tripevolved/",
      alt: "Linkedin",
    },
  ],
};

export default function OurDestinationsRoute() {
  return (
    <PageBase seo={{ title: "Nossos destinos" }} navbar={NAVBAR_CONFIG} footer={FOOTER_CONFIG}>
      <PublicDestinations />
    </PageBase>
  );
}
