import { NextSeoProps } from "next-seo";

type SeoProps = NextSeoProps;

interface PageProps extends Partial<TemplateProps> {
  children: any;
}

interface NavbarProps {
  menu?: MenuProps;
  exact?: Boolean;
}

interface FooterProps {
  menu?: MenuGroupProps[];
  social?: SocialProps;
  slogan?: string;
}

type SocialProps = SocialItemProps[];

interface SocialItemProps {
  icon: string;
  alt: string;
  href: string;
}

interface MenuGroupProps {
  title: string;
  list: MenuProps;
}

type MenuProps = MenuItemProps[];

interface MenuItemProps {
  group?: string;
  label: string;
  href: string;
  isExternal?: boolean;
  highlight?: boolean;
}

interface TemplateProps {
  navbar: NavbarProps;
  footer: FooterProps;
  seo: SeoProps;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

export type {
  PageProps,
  SeoProps,
  MenuProps,
  MenuGroupProps,
  MenuItemProps,
  FooterProps,
  NavbarProps,
  SocialProps,
  TemplateProps,
};
