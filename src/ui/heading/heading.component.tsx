import {
  Box,
  BoxProps,
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
} from "@chakra-ui/react";
import { useMemo } from "react";

export interface HeadingProps extends ChakraHeadingProps {
  html?: string;
  size?: "xs" | "sm" | "md" | "lg";
  as?: "h1" | "h2" | "h3";
  lineDecoration?: LineDecorationProps;
}

export const Heading = ({
  children,
  html,
  as = "h2",
  size = "md",
  lineDecoration,
  ...props
}: HeadingProps) => {
  if (html) {
    props.dangerouslySetInnerHTML = { __html: html };
  }

  const fontSize = useMemo(() => {
    if (size === "lg") return ["2xl", "2xl", "3xl", "4xl"];
    if (size === "md") return ["xl", "xl", "2xl"];
    if (size === "sm") return ["lg", "lg", "xl"];
    if (size === "xs") return ["md", "md", "lg"];
    return undefined;
  }, [size]);

  return (
    <>
      <ChakraHeading as={as} fontWeight={500} fontSize={fontSize} {...props}>
        {children}
      </ChakraHeading>
      {lineDecoration && <LineDecoration {...lineDecoration} />}
    </>
  );
};

interface LineDecorationProps extends BoxProps {}

const LineDecoration = (props: LineDecorationProps) => {
  return (
    <Box {...props}>
      <svg
        style={{ maxWidth: "100%" }}
        width="372"
        height="40"
        viewBox="0 0 372 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M182.67 30.8889C221.203 19.0758 309.638 0.756055 355.124 21.9826"
          stroke="currentColor"
        />
      </svg>
    </Box>
  );
};
