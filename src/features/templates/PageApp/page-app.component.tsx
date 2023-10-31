import { NextSeo } from "next-seo";
import type { PageAppProps } from "./page-app.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { PageAppMenu } from "@/features";
import { PageAppMenuProvider } from "../PageAppMenu/page-app-menu.provider";

export function PageApp({ children, seo, className, headerOptions }: PageAppProps) {
  const cn = makeCn("page-app__main", className)();

  return (
    <PageAppMenuProvider headerOptions={headerOptions}>
      <div className="page-app">
        {seo ? <NextSeo {...seo} /> : null}
        <PageAppMenu />
        <main className={cn}>{children}</main>
      </div>
    </PageAppMenuProvider>
  );
}
