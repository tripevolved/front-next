import type { NavbarProps } from "./navbar.types";

import { Logo } from "@/components";
import { Button, Link, ToggleButton } from "mars-ds";
import { useEffect, useState } from "react";
import { LeadApiService } from "@/services/api/lead";
import { MenuItemProps } from "@/types";

const subscribedMenu = {
  label: "Minha inscrição",
  href: "/inscrito"
} satisfies MenuItemProps;

export function Navbar({ menu: inheritedMenu = [] }: NavbarProps) {
  const [menu, setMenu] = useState<MenuItemProps[]>(inheritedMenu);
  const [open, setOpen] = useState(false);
  const hasMenu = Boolean(menu?.length);

  useEffect(() => {
    const localLead = LeadApiService.getLocal();
    if (!localLead) return;
    setMenu([subscribedMenu, ...inheritedMenu]);
  }, [inheritedMenu]);

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
