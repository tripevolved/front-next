import { ComponentHTMLProps } from "@/types";
import { css, cx } from "@emotion/css";
import { Heading, Text as MarsText, TextProps as MarsTextProps } from "mars-ds";

export interface TextProps extends MarsTextProps, Pick<ComponentHTMLProps, 'sx'> {
  variant?: "heading" | "default";
};

export function Text({ children, variant, sx, ...props }: TextProps) {
  props.className = cx(props.className, css(sx));
  const Component = variant === "heading" ? Heading : MarsText;
  if (typeof children !== "object") return <Component {...props}>{children}</Component>;
  return <Component {...props} {...children} />;
}
