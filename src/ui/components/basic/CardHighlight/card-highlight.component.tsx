import { Card } from "mars-ds";
import type { CardHighlightProps } from "./card-highlight.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function CardHighlight({ className, children, sx, ...props }: CardHighlightProps) {
  const cn = makeCn("card-highlight", className)(sx);

  return (
    <Card className={cn} {...props}>
      {children}
    </Card>
  );
};
