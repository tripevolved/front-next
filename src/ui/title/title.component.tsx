import { fontDisplay } from "@/configs/font-family.config";
import { Text, TextProps } from "@nextui-org/react";

export interface TitleProps extends TextProps {
  html?: string;
  h1?: boolean;
  h2?: boolean;
  color?: string;
}

export const Title = ({ children, html, ...props }: TitleProps) => {
  if (html) {
    props.dangerouslySetInnerHTML = { __html: html };
  }
  return (
    <Text
      weight="thin"
      css={{
        lineHeight: 1.2,
        margin: 0,
        fontSize: "$3xl",
        "@sm": {
          fontSize: "$4xl",
        },
        "@md": {
          fontSize: "$5xl",
        },
      }}
      style={{
        fontFamily: fontDisplay.style.fontFamily,
      }}
      {...props}
    >
      {children}
    </Text>
  );
};
