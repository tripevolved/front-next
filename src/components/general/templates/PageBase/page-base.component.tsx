import type { PageBaseProps } from "./page-base.types";

import { Footer, Navbar } from "@/components";

export function PageBase({ children, navbar, footer }: PageBaseProps) {
  return (
    <>
      <Navbar {...navbar} />
      <main>{children}</main>
      <Footer {...footer} />
    </>
  );
}
