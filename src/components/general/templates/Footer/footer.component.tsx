import type { FooterProps } from "./footer.types";

import { Logo, Picture } from "@/components";
import { Divider, Icon, Link, SectionBase, Text, TextProps } from "mars-ds";

export function Footer({ slogan, menu = [], social = [] }: FooterProps) {
  return (
    <SectionBase as="footer" className="footer">
      <div className="py-2x footer__container">
        <div className="footer__first">
          <Link href="/">
            <Logo />
          </Link>
          <Text size="sm" className="my-lg">
            {slogan}
          </Text>
        </div>
        <div className="footer__container flex-fill">
          {menu.map(({ title, list = [] }) => (
            <FooterMenu key={title} title={title}>
              {list.map(({ href, label, isExternal }) => (
                <Link key={href} href={href} target={isExternal ? "_blank" : undefined}>
                  {label}
                </Link>
              ))}
            </FooterMenu>
          ))}
          <FooterMenu title="Siga nas redes">
            <div className="flex gap-lg">
              {social.map(({ icon, alt, href }) => (
                <Link key={href} title={alt} href={href} target="_blank">
                  <Icon name={icon} />
                </Link>
              ))}
            </div>
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
  <div className="footer__menu flex-fill" {...props}>
    <Text size="lg" className="footer__menu__subtitle">
      {title}
    </Text>
    {children}
  </div>
);
