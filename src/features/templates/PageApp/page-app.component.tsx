import { NextSeo } from "next-seo";
import type { PageAppProps } from "./page-app.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { PageAppMenu } from "@/features";

export function PageApp({ children, seo, className }: PageAppProps) {
  const cn = makeCn("page-app", className)();

  return (
    <>
      {seo ? <NextSeo {...seo} /> : null}
      <PageAppMenu />
      <main className={cn}>{children}</main>
    </>
  );
}
