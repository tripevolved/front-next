import { NextSeoProps } from "next-seo";

type SeoProps = NextSeoProps;

interface PageProps {
  navbar?: NavbarProps;
  footer?: FooterProps;
  children: any;
  seo?: SeoProps;
}

interface NavbarProps {
  menu?: MenuProps;
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

export type {
  PageProps,
  SeoProps,
  MenuProps,
  MenuGroupProps,
  FooterProps,
  NavbarProps,
  SocialProps,
};
