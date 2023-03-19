import type { NavbarProps } from "./navbar.types";

import { Logo } from "@/components";
import { Button, Link, ToggleButton } from "mars-ds";
import { useState } from "react";

export function Navbar({ menu = [] }: NavbarProps) {
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
        </menu>
      ) : null}
    </nav>
  );
}
