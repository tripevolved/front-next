import {
  Text as NextUiText,
  TextProps as NextUiTextProps,
} from "@nextui-org/react";

export interface TextProps extends NextUiTextProps {
  html?: string;
}

export const Text = ({ children, html, ...props }: TextProps) => {
  if (html) {
    props.dangerouslySetInnerHTML = { __html: html };
  }
  return <NextUiText {...props}>{children}</NextUiText>;
};
