import type { StateTemplateProps } from "./state-template.types";

import { makeCn } from "@/utils/helpers/css.helpers";

import { Picture, Text } from "@/ui";
import { Button } from "mars-ds";

const DEFAULT_TEXT = "Ops! algo não saiu como esperado!";
const DEFAULT_IMAGE = "/assets/states/empty-state.svg";

export function StateTemplate({
  className,
  children,
  sx,
  heading,
  text = DEFAULT_TEXT,
  image = DEFAULT_IMAGE,
  retry = false,
  ...props
}: StateTemplateProps) {
  const cn = makeCn("state-template", className)(sx);

  return (
    <div className={cn} {...props}>
      <Picture>{image}</Picture>
      {heading ? (
        <Text heading as="h4" size="xs">
          {heading}
        </Text>
      ) : null}
      <Text className="color-text-secondary">{text}</Text>
      {retry && (
        <Button variant="neutral" size="sm" iconName="rotate-ccw" onClick={() => location.reload()}>
          Tentar novamente
        </Button>
      )}
      {children}
    </div>
  );
}
