import type { PageBaseProps } from "./page-base.types";

import { Footer, Navbar } from "@/components";

export function PageBase({ children }: PageBaseProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
