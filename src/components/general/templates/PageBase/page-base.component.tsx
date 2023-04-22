import type { PageBaseProps } from "./page-base.types";

import { Footer, Navbar } from "@/components";

export function PageBase({ children, hideNavbar, hideFooter, navbar, footer }: PageBaseProps) {
  return (
    <>
      {hideNavbar ? null : <Navbar {...navbar} />}
      <main>{children}</main>
      {hideFooter ? null : <Footer {...footer} />}
    </>
  );
}
