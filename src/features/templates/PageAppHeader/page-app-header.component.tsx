import { useAppStore } from "@/core/store";
import { ModalContent, Text, UserAvatar } from "@/ui";
import { Avatar, Button, Container, Divider, Grid, Modal, ToggleButton } from "mars-ds";
import { makeCn } from "@/utils/helpers/css.helpers";
import { NotificationButton } from "@/features";
import { useRouter } from "next/router";
import { getWhatsappLink } from "@/utils/helpers/whatsapp.helpers";

export interface PageAppHeaderProps {
  image?: string;
  title?: string;
  subtitle?: string;
  backUrl?: string;
  hideMobileMoldure?: boolean;
}

export function PageAppHeader({
  image,
  title,
  subtitle,
  backUrl,
  hideMobileMoldure,
}: PageAppHeaderProps) {
  const cn = makeCn("page-app-header", { "page-app-header--sm": hideMobileMoldure })();
  const { availableFeatures } = useAppStore((state) => state.travelerState);

  const allowNotifications = availableFeatures
    ? availableFeatures.includes("NOTIFICATIONS")
    : false;
  const router = useRouter();
  const { pathname } = router;
  const isPanel = pathname.includes("painel");

  return (
    <>
      <nav className={cn}>
        <Container container="lg">
          <div>
            <Grid columns={["auto", "1fr"]} className="align-items-center">
              {backUrl ? (
                <ToggleButton
                  className="page-app-header__backButton"
                  variant="neutral"
                  iconName="arrow-left"
                  title="Voltar"
                  href={backUrl}
                />
              ) : image ? (
                <Avatar thumbnail={image} />
              ) : null}
              <div className="page-app-header__info">
                {title ? (
                  // @ts-ignore
                  <Text size="xxs" variant="heading">
                    {title}
                  </Text>
                ) : null}
                {subtitle ? <Text>{subtitle}</Text> : null}
              </div>
            </Grid>
          </div>
          <div className="flex">
            {!allowNotifications ? null : isPanel ? <NotificationButton /> : null}
            <ToggleButton
              className="page-app-header__toggle"
              variant="text"
              iconName="menu"
              title="Abrir o menu"
              onClick={() => Modal.open(MenuModal, { closable: true, size: "lg" })}
            />
          </div>
        </Container>
      </nav>
      <div className="page-app-header-extension" />
    </>
  );
}

const MENU = [
  {
    title: "Sua conta",
    links: [
      {
        label: "Alterar dados",
        disabled: true,
      },
    ],
  },
  {
    title: "Mais opções",
    links: [
      {
        label: "Home",
        href: "/app/painel",
      },
      {
        label: "Comprar viagem",
        href: "/app/viagens/descobrir",
      },
      {
        label: "Falar com especialista",
        disabled: false,
        iconName: "whatsapp",
        onClick: () => {
          window.open(getWhatsappLink("Olá, eu gostaria de planejar a minha próxima viagem!"));
        },
      },
      {
        label: "Sair da conta",
        iconName: "log-out",
        href: "/app/sair",
      },
    ],
  },
];

function MenuModal() {
  const { email, username } = useAppStore((state) => state.user);

  return (
    <ModalContent className="menu-modal">
      <div className="menu-modal__header">
        <UserAvatar name={username} description={email} />
      </div>
      {MENU.map(({ title, links }) => (
        <div key={title} className="menu-modal__body">
          <Text as="h3" className="menu-modal__title">
            {title}
          </Text>
          {links.map((props) => (
            <>
              <Button
                key={props.label}
                className="menu-modal__action"
                variant="naked"
                isRtl
                iconName="chevron-right"
                isRounded={false}
                {...props}
              />
              <Divider />
            </>
          ))}
        </div>
      ))}
    </ModalContent>
  );
}
