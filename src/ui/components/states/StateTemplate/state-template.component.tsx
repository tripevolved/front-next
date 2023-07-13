import type { StateTemplateProps } from "./state-template.types";

import { makeCn } from "@/utils/helpers/css.helpers";

import { Picture, Text } from "@/ui";

const DEFAULT_TEXT = "Ops! algo não saiu como esperado!";
const DEFAULT_IMAGE = "/assets/states/empty-state.svg";

export function StateTemplate({ className,
  children,
  sx,
  heading,
  text = DEFAULT_TEXT,
  image = DEFAULT_IMAGE,
  ...props }: StateTemplateProps) {
  const cn = makeCn("state-template", className)(sx);

  return (
    <div className={cn} {...props}>
      <Picture>{image}</Picture>
      {heading ? <Text heading as="h4" size="xs">{heading}</Text> : null}
      <Text>{text}</Text>
      {children}
    </div>
  );
};
