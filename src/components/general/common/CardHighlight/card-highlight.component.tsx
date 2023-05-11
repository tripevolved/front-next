import { Card } from "mars-ds";
import type { CardHighlightProps } from "./card-highlight.types";

import { makeClassName } from "@/helpers/classname.helpers";

export function CardHighlight({ className, children, sx, ...props }: CardHighlightProps) {
  const cn = makeClassName("card-highlight", className)(sx);

  return (
    <Card className={cn} {...props}>
      {children}
    </Card>
  );
};
