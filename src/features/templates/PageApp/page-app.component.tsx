import { NextSeo } from "next-seo";
import type { PageAppProps } from "./page-app.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function PageApp({ children, seo }: PageAppProps) {
  const cn = makeCn("page-app")();

  return (
    <>
      {seo ? <NextSeo {...seo} /> : null}
      <main className={cn}>{children}</main>
    </>
  );
}
