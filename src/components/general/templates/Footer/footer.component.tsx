import type { FooterProps } from "./footer.types";

import { Logo, Picture } from "@/components";
import classNames from "classnames";
import { Divider, Icon, Link, SectionBase, Text, TextProps } from "mars-ds";

export function Footer({ className, children, ...props }: FooterProps) {
  const cn = classNames("footer", className);

  return (
    <SectionBase as="footer" className={cn} {...props}>
      <div className="py-2x footer__container">
        <div className="flex-fill">
          <Link href="/">
            <Logo />
          </Link>
          <Text className="my-lg">
            Utilizamos tecnologia para <br /> criar experiências únicas.
          </Text>
        </div>
        <div className="footer__container flex-fill">
          <FooterMenu title="Fale conosco">
            <Link>info@tripevolved.com.br</Link>
          </FooterMenu>
          <FooterMenu title="Legal">
            <Link href="/termos-de-uso">Termos de Uso</Link>
            <Link href="/politica-de-privacidade">Políticas de Privacidade</Link>
            <Link href="/politica-de-cookies">Políticas de Cookies</Link>
          </FooterMenu>
          <FooterMenu title="Lançamento">
            <Link href="/#lista-de-espera">Participe da lista de espera</Link>
          </FooterMenu>
          <FooterMenu title="Siga nas redes">
            <Link href="https://www.instagram.com/tripevolved/" target="_blank">
              <Icon name="instagram" />
            </Link>
          </FooterMenu>
        </div>
      </div>
      <Divider className="my-lg" />
      <div className="py-lg footer__container">
        <div className="flex gap-lg align-items-end">
          Associados a <Picture alt="Cadastur" src="/assets/cadastur.png" height={21} width={134} />{" "}
          <Picture alt="ABAV" src="/assets/abav.png" height={29} width={56} />
        </div>
        <Text size="sm" className="pt-lg">
          Copyright © {new Date().getFullYear()} Trip Evolved. Todos os direitos reservados.
        </Text>
      </div>
    </SectionBase>
  );
}

interface MenuColumnProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: string | TextProps;
}

const FooterMenu = ({ title, children, className, ...props }: MenuColumnProps) => (
  <div className={classNames("footer__menu flex-fill", className)} {...props}>
    <Text size="lg" className="footer__menu__subtitle">
      {title}
    </Text>
    {children}
  </div>
);
