import { ComponentHTMLProps } from "@/types";
import { css, cx } from "@emotion/css";
import { Heading, Text as MarsText, TextProps as MarsTextProps } from "mars-ds";

export interface TextProps extends MarsTextProps, Pick<ComponentHTMLProps, 'sx'> {
  variant?: "heading" | "default";
  text?: string | number | null;
};

export function Text({ children, text, variant, sx, ...props }: TextProps) {
  props.className = cx(props.className, css(sx));
  const Component = variant === "heading" ? Heading : MarsText;
  if (text) return <Component {...props}>{text}</Component>;
  if (typeof children !== "object") return <Component {...props}>{children}</Component>;
  return <Component {...props} {...children} />;
}
