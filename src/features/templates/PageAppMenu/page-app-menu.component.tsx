import { useAppStore } from "@/core/store";
import { ModalContent, Text, UserAvatar } from "@/ui";
import { Avatar, Button, Container, Divider, Grid, Modal, ToggleButton } from "mars-ds";
import type { PageAppMenuValue } from "./page-app-menu.context";
import { useAppMenu } from "./page-app-menu.hook";

interface PageAppMenuProps extends PageAppMenuValue {
  children?: React.ReactNode;
}

export function PageAppMenu({ children }: PageAppMenuProps) {
  const { image, title, subtitle, backUrl } = useAppMenu();
  return (
    <nav className="page-app-menu">
      <Container container="lg">
        <div>
          <Grid columns={["auto", "1fr"]} className="align-items-center">
            {backUrl ? (
              <ToggleButton variant="text" iconName="arrow-left" href={backUrl} />
            ) : image ? (
              <Avatar thumbnail={image} />
            ) : null}
            <div className="page-app-menu__info">
              {title ? (
                // @ts-ignore
                <Text size="xxs" variant="heading">
                  {title}
                </Text>
              ) : null}
              {subtitle ? <Text>{subtitle}</Text> : null}
            </div>
          </Grid>
          {children}
        </div>
        <ToggleButton
          className="page-app-menu__toggle"
          variant="text"
          iconName="menu"
          title="Abrir o menu"
          onClick={() => Modal.open(MenuModal, { closable: true, size: "lg" })}
        />
      </Container>
    </nav>
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
        label: "Contratar suporte",
        disabled: true,
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
