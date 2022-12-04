import { Text as _Text, TextProps as _TextProps } from "@chakra-ui/react";
import { useMemo } from "react";

export interface TextProps extends _TextProps {
  html?: string;
  size?: "sm" | "md" | "lg";
}

export const Text = ({ children, html, size, ...props }: TextProps) => {
  if (html) {
    props.dangerouslySetInnerHTML = { __html: html };
  }
  const fontSize = useMemo(() => {
    if (size === "lg") return { base: "lg", md: "xl" };
    if (size === "md") return { base: "md", md: "lg" };
    return undefined;
  }, [size]);
  return (
    <_Text fontSize={fontSize} {...props}>
      {children}
    </_Text>
  );
};
