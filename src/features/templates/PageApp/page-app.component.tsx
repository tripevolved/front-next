import { NextSeo } from "next-seo";
import type { PageAppProps } from "./page-app.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { PageAppHeader } from "@/features";
import { Container } from "mars-ds";

export function PageApp({ children, seo, className, headerOptions, hideHeader }: PageAppProps) {
  const cn = makeCn("page-app__container", className)();

  return (
    <>
      {hideHeader ? null : <PageAppHeader {...headerOptions} />}
      {seo ? <NextSeo {...seo} /> : null}
      <main className="page-app">
        <Container container="lg" className={cn}>
          {children}
        </Container>
      </main>
    </>
  );
}
