import { useAppStore } from "@/core/store";
import { LogoMainInverse, ModalContent, Text, UserAvatar } from "@/ui";
import { Button, Container, Divider, Link, Modal, ToggleButton } from "mars-ds";

export function PageAppMenu() {
  return (
    <nav className="page-app-menu">
      <Container container="md">
        <Link href="/app/painel" title="Ir para o painel">
          <LogoMainInverse />
        </Link>
        <ToggleButton
          className="page-app-menu__toggle"
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
