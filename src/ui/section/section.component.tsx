import { Box, BoxProps, Container } from "@chakra-ui/react";
import { useMemo } from "react";

export interface SectionProps extends Omit<BoxProps, "title"> {
  pyAuto?: "none" | "sm" | "md";
}

export const Section = ({
  children,
  pyAuto = "md",
  maxW = "container.lg",
  maxWidth,
  ...props
}: SectionProps) => {
  const py = useMemo(() => {
    if (!pyAuto || pyAuto === "none") return undefined;
    if (pyAuto === "sm") return { base: 10, md: 15 };
    return { base: 10, md: 15, lg: 20 };
  }, [pyAuto]);
  return (
    <Box as="section" py={py} {...props}>
      <Container maxW={maxWidth || maxW}>{children}</Container>
    </Box>
  );
};
