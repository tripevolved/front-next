import type { NavbarProps } from "./navbar.types";

import { Logo } from "@/ui";
import { Button, Link, ToggleButton } from "mars-ds";
import { useEffect, useState } from "react";
import { MenuItemProps } from "@/core/types";
import { useAppStore } from "@/core/store";

export function Navbar({ menu, exact }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const hasMenu = Boolean(menu?.length);

  const { user } = useAppStore();

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
          {menu?.map(({ label, href, isExternal, highlight }) => (
            <Button
              key={href}
              href={href}
              variant={highlight ? "secondary" : "naked"}
              target={isExternal ? "_blank" : undefined}
            >
              {label}
            </Button>
          ))}
          {exact ? null : user.fetched ? (
            <Button href="/app/painel" className="navbar__menu__signin-button">
              Acessar painel
            </Button>
          ) : null}
        </menu>
      ) : null}
    </nav>
  );
}
