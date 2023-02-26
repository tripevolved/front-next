import type { NavbarProps } from "./navbar.types";

import { Logo } from "@/components";
import { Button, Link, ToggleButton } from "mars-ds";
import { useState } from "react";

const menuDefault: NavbarProps["menu"] = [
  {
    children: "Sobre nós",
    href: "/sobre",
    variant: "naked",
  },
  {
    children: "Seja pioneiro",
    href: "/lancamento",
    variant: "secondary",
  },
];

export function Navbar({ menu = menuDefault }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const hasMenu = Boolean(menu?.length);

  return (
    <nav className="navbar">
      <div className="navbar__main">
        <Link href="/">
          <Logo />
        </Link>
        {hasMenu ? (
          <ToggleButton
            className="navbar__hamburger"
            iconName="menu"
            variant="text"
            onClick={() => setOpen((state) => !state)}
          />
        ) : null}
      </div>
      {hasMenu ? (
        <menu className="navbar__menu" data-open={open}>
          {menu?.map((item) => (
            <Button key={item.href} {...item} />
          ))}
        </menu>
      ) : null}
    </nav>
  );
}
