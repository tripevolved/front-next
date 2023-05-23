import type { AdminPageProps } from "./admin-page.types";

import { NextSeo } from "next-seo";
import { css, cx } from "@emotion/css";

import { NoSSR } from "@/ui";

export function AdminPage({ className, children, sx, ...props }: AdminPageProps) {
  const cn = cx(className, css(sx));


  return (
    <NoSSR>
      <NextSeo title="Admin" nofollow noindex />
      <div className={cn} {...props}>
        {children}
      </div>
    </NoSSR>
  );
}
