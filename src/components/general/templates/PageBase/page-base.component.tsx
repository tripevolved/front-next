import type { PageBaseProps } from "./page-base.types";

import { Footer, Navbar } from "@/components";

export const PageBase = ({ children }: PageBaseProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
