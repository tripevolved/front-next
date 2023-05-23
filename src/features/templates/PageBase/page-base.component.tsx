import { NextSeo } from "next-seo";
import type { PageBaseProps } from "./page-base.types";

import { Footer, Navbar } from "@/features";

export function PageBase({ children, hideNavbar, hideFooter, navbar, footer, seo }: PageBaseProps) {
  return (
    <>
      {seo ? <NextSeo {...seo} /> : null}
      {hideNavbar ? null : <Navbar {...navbar} />}
      <main>{children}</main>
      {hideFooter ? null : <Footer {...footer} />}
    </>
  );
}
