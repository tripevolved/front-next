import { Picture, Text } from "@/components";
import type { EmptyStateProps } from "./empty-state.types";

import { makeClassName } from "@/helpers/classname.helpers";

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
  const cn = makeClassName("empty-state", className)(sx);

  return (
    <div className={cn} {...props}>
      <Picture>{image}</Picture>
      <Text>{text}</Text>
      {children}
    </div>
  );
}
