import type { NavbarProps } from "./navbar.types";

import { Logo } from "@/components";
import { Button, Link, ToggleButton } from "mars-ds";
import { useState } from "react";

const menuDefault = [
  {
    children: "Sobre nós",
    href: "/sobre",
    variant: "naked",
  },
  {
    children: "Seja pioneiro",
    href: "/seja-pioneiro",
    variant: "secondary",
  },
] satisfies NavbarProps["menu"];

export const Navbar = ({ menu = menuDefault }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__main">
        <Link href="/">
          <Logo />
        </Link>
        <ToggleButton
          className="navbar__hamburger"
          iconName="menu"
          variant="text"
          onClick={() => setOpen((state) => !state)}
        />
      </div>
      <menu className="navbar__menu" data-open={open}>
        {menu.map((item) => (
          <Button key={item.href} {...item} />
        ))}
      </menu>
    </nav>
  );
};
