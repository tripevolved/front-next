import type { ButtonProps } from "./button.types";

import { Button as MarsButton } from "mars-ds";
import NextLink from "next/link";

export const Button = ({ backgroundColor, color, style, href, ...props }: ButtonProps) => {
  const computedStyle = { backgroundColor, color, ...style };
  if (!href) {
    return <MarsButton style={computedStyle} href={href} {...props} />;
  }
  return (
    <NextLink href={href}>
      <MarsButton as={"a"} href={href} {...props} />
    </NextLink>
  );
};
