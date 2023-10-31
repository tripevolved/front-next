import type { PageAppBodyProps } from "./page-app-body.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Container } from "mars-ds";

export function PageAppBody({ className, children, sx, ...props }: PageAppBodyProps) {
  const cn = makeCn("page-app-body", className)(sx);

  return (
    <section className={cn} {...props}>
      <Container container="md" className="page-app-body__container">
        {children}
      </Container>
    </section>
  );
};
