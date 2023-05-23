import { Picture, Text } from "@/ui";
import type { EmptyStateProps } from "./empty-state.types";

import { makeCn } from "@/utils/helpers/css.helpers";

const DEFAULT_TEXT = "Ops! algo não saiu como esperado!";
const DEFAULT_IMAGE = "/assets/states/empty-state.svg";

export function EmptyState({
  className,
  children,
  sx,
  text = DEFAULT_TEXT,
  image = DEFAULT_IMAGE,
  ...props
}: EmptyStateProps) {
  const cn = makeCn("empty-state", className)(sx);

  return (
    <div className={cn} {...props}>
      <Picture>{image}</Picture>
      <Text>{text}</Text>
      {children}
    </div>
  );
}
