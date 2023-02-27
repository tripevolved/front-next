import type { AdminPageProps } from "./admin-page.types";

import { css, cx } from "@emotion/css";
import { HTMLHead } from "../../HTMLHead";

export function AdminPage({ className, children, sx, ...props }: AdminPageProps) {
  const cn = cx(className, css(sx));

  return (
    <>
      <HTMLHead title="Trip Evolved | Admin" robots="noindex, nofollow" />
      <div className={cn} {...props}>
        {children}
      </div>
    </>
  );
}
