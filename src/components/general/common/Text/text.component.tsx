import { Heading, Text as MarsText, TextProps as MarsTextProps } from "mars-ds";

export type TextProps = {
  variant?: "heading" | "default";
} & MarsTextProps;

export const Text = ({ children, variant, ...props }: TextProps) => {
  const Component = variant === "heading" ? Heading : MarsText;
  if (typeof children !== "object") return <Component {...props}>{children}</Component>;
  return <Component {...props} {...children} />;
};
